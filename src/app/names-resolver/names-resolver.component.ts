import {Component, OnInit} from '@angular/core';
import {ApiClientService} from '../api-client/api-client.service';
import {Observable} from "rxjs/Observable";
import gql from "graphql-tag";
import {NameResolverQuery, NameResolverQueryVariables} from "../api-client/OperationResultTypes";
import {Apollo} from "apollo-angular";

@Component({
  selector: 'app-names-resolver',
  templateUrl: './names-resolver.component.html',
  styleUrls: ['./names-resolver.component.scss'],
  providers: [ApiClientService]
})
export class NamesResolverComponent implements OnInit {
  searchText = 'Homo sapiens\nSalinator solida\nCanis lupus';
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
              private _apollo: Apollo) {
    this.apiClientService = apiClientService;
  }

  ngOnInit() {
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
