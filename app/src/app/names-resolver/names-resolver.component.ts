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
          total
          results {
            name {
              value
            }
            resultsPerDataSource {
              dataSource {
                id
                title
              }
              results {
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
              }
            }
          }
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
      this.goSearch(this._searchStatusService.searchStatusLatest());
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
    const queryParams: Params = Object.assign({}, this._activatedRoute.snapshot.queryParams);
    this.selectItem(0);
    queryParams['q'] = names.join('|');
    queryParams['db'] = searchStatus.dataSourceIds.filter(x => x !== 0).join(',');
    queryParams['bo'] = searchStatus.bestOnly;
    this._router.navigate(
      [this._activatedRoute.snapshot.url.join('/')],
      {queryParams: queryParams}
    );

    const namesVar = names.map(n => ({value: n}));
    console.log('resolving names: ');
    console.log(namesVar);
    this._apollo.query<NameResolverQuery, NameResolverQueryVariables>({
      query: this.NAME_RESOLVER_QUERY,
      variables: {
        names: namesVar,
        bestMatchOnly: searchStatus.bestOnly,
        dataSourceIds: searchStatus.dataSourceIds.filter(x => x !== 0),
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

  selectItem(idx) {
    console.log(idx);
    this.selectedNameIdx = idx;
  }

  matchKindColor(matchKind: String) {
    switch (matchKind) {
      case 'Match':
        return 'green';
      case 'Fuzzy':
        return 'yellow';
    }
  }

}
