import {Component, OnInit} from '@angular/core';
import {ApiClientService} from '../api-client/api-client.service';
import gql from 'graphql-tag';
import {NameResolverQuery, NameResolverQueryVariables} from '../api-client/OperationResultTypes';
import {Apollo} from 'apollo-angular';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-names-resolver',
  templateUrl: './names-resolver.component.html',
  styleUrls: ['./names-resolver.component.scss'],
  providers: [ApiClientService]
})
export class NamesResolverComponent implements OnInit {
  searchText = '';
  loading = false;
  resultIsFetched = false;
  responses = [];
  searchingNames = [];
  apiClientService: ApiClientService;
  selectedNameIdx = 0;

  private NAME_RESOLVER_QUERY = gql`
    query NameResolver($names: [name!]!) {
      nameResolver(names: $names, bestMatchOnly: true) {
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
          }
          total
        }
      }
    }`;

  constructor(apiClientService: ApiClientService,
              private _apollo: Apollo,
              private _activatedRoute: ActivatedRoute,
              private _router: Router) {
    this.apiClientService = apiClientService;
  }

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe((params: Params) => {
      console.log(params);
      this.searchText = (params['names'] || '').split('|').filter(x => x.length > 0).join('\n');
    });
  }

  search() {
    if (this.searchText === '') {
      return;
    }

    this.loading = true;
    this.resultIsFetched = false;
    this.selectedNameIdx = 0;
    this.searchingNames = [];

    const names = this.searchText.split('\n').filter(x => x.length > 0);
    this._router.navigate(['/resolver'], {queryParams: {names: names.join('|')}});

    const namesVar = names.map(n => ({value: n}));
    console.log('resolving names: ');
    console.log(namesVar);
    this._apollo.query<NameResolverQuery, NameResolverQueryVariables>({
      query: this.NAME_RESOLVER_QUERY,
      variables: {names: namesVar}
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

}
