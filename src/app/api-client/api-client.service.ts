import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {
  NameResolverQuery, NameResolverQueryVariables, NameStringsQuery, NameStringsQueryVariables
} from './OperationResultTypes';
import gql from 'graphql-tag';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiClientService {
  private _apollo: Apollo;
  private NAME_STRINGS_QUERY = gql`
    query NameStrings($searchTerm: String!) {
      nameStrings(searchTerm: $searchTerm) {
        name {
          id
          value
        }
        dataSources {
          title
        }
        canonicalName {
          id
          value
        }
        classification {
          path
        }
      }
    }`;

  private NAME_RESOLVER_QUERY = gql`
    query NameResolver($names: [name!]!) {
      nameResolver(names: $names) {
        responses {
          suppliedInput
          results {
            name {
              value
            }
            canonicalName {
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
    }
  `;

  constructor(apollo: Apollo) {
    this._apollo = apollo;
  }

  searchNameStrings(searchText: string) {
    console.log('searchText: ' + searchText);
    return this._apollo.query<NameStringsQuery, NameStringsQueryVariables>({
      query: this.NAME_STRINGS_QUERY,
      variables: {
        searchTerm: searchText
      }
    }).map(({data}) => data.nameStrings);
  }

  resolveNames(names: string[]) {
    console.log('resolving names: ' + names);
    const namesVar = names.map(n => ({value: n}));
    return this._apollo.query<NameResolverQuery, NameResolverQueryVariables>({
      query: this.NAME_RESOLVER_QUERY,
      variables: { names: namesVar }
    }).map(({data}) => data.nameResolver.responses);
  }

  formatClassificationPath(classification: any) {
    if (!classification || !classification.path) {
      return null;
    }
    return classification.path.replace(/\|/gi, ' > ');
  }

}
