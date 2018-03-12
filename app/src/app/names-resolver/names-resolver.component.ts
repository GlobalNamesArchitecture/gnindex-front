import {Component, OnInit} from '@angular/core';
import {ApiClientService} from '../api-client/api-client.service';
import gql from 'graphql-tag';
import {NameResolverQuery, NameResolverQueryVariables} from '../api-client/OperationResultTypes';
import {Apollo} from 'apollo-angular';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SearchStatus, SearchStatusService} from '../search-box/search-box.service';

@Component({
  selector: 'app-names-resolver',
  templateUrl: './names-resolver.component.html',
  styleUrls: ['./names-resolver.component.scss'],
  providers: [ApiClientService]
})
export class NamesResolverComponent implements OnInit {
  searchText: string;
  loading = false;
  resultIsFetched = false;
  responses = [];
  searchingNames = [];
  apiClientService: ApiClientService;
  selectedNameIdx = 0;

  private NAME_RESOLVER_QUERY = gql`
    query NameResolver($names: [name!]!, $dataSourceIds: [Int!], $bestMatchOnly: Boolean) {
      nameResolver(names: $names, bestMatchOnly: $bestMatchOnly, dataSourceIds: $dataSourceIds) {
        responses {
          suppliedInput
          results {
            name {
              value
            }
            classification {
              path
            }
            acceptedName {
              name {
                value
              }
            }
            matchType {
              kind
              score
            }
            dataSource {
              id
              title
            }
          }
          total
        }
      }
    }`;

  constructor(apiClientService: ApiClientService,
              private _apollo: Apollo,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _searchStatusService: SearchStatusService) {
    this.apiClientService = apiClientService;

    this._searchStatusService.searchStatus$.subscribe(searchStatus => {
      this.goSearch(searchStatus);
    });
  }

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe((params: Params) => {
      console.log(params);
      const searchText = (params['q'] || '').split('|').filter(x => x.length > 0).join('\n');
      const ss = new SearchStatus(searchText);
      this.goSearch(ss);
    });
  }

  goSearch(searchStatus: SearchStatus) {
    this.searchText = searchStatus.searchText;
    if (this.searchText === '') {
      return;
    }

    this.loading = true;
    this.resultIsFetched = false;
    this.selectedNameIdx = 0;
    this.searchingNames = [];

    const names = this.searchText.split('\n').filter(x => x.length > 0);
    this._router.navigate(['/search'], {queryParams: {q: names.join('|')}});

    const namesVar = names.map(n => ({value: n}));
    console.log('resolving names: ');
    console.log(namesVar);
    this._apollo.query<NameResolverQuery, NameResolverQueryVariables>({
      query: this.NAME_RESOLVER_QUERY,
      variables: {
        names: namesVar,
        dataSourceIds: searchStatus.dataSourceIds,
        bestMatchOnly: searchStatus.bestOnly,
      }
    }).subscribe(({data}) => {
      console.log(data);

      this.loading = false;
      this.resultIsFetched = true;

      this.responses = data['nameResolver'].responses;
      this.searchingNames = names;
      console.log(this.responses);
    });
  }

  selectedResult() {
    console.log(this.responses[this.selectedNameIdx]);
    return this.responses[this.selectedNameIdx];
  }

  showMatchKind(): boolean {
    return this.selectedResult().results[0].matchType.kind.toLowerCase() != 'match';
  }

  selectItem(idx) {
    console.log(idx);
    this.selectedNameIdx = idx;
  }

}