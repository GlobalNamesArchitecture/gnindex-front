import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {
  NameResolverQuery, NameResolverQueryVariables, NameStringsQuery, NameStringsQueryVariables
} from './OperationResultTypes';
import gql from 'graphql-tag';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiClientService {
  _apollo: Apollo;
  private NAME_STRINGS_QUERY = gql`
    query NameStrings($searchTerm: String!, $page: Int, $perPage: Int) {
      nameStrings(searchTerm: $searchTerm, page: $page, perPage: $perPage) {
        page
        perPage
        resultsCount
        results {
          name {
            id
            value
          }
          canonicalName {
            id
            value
          }
          dataSources {
            id
            title
          }
          acceptedName {
            name {
              value
            }
          }
          classification {
            path
            pathRanks
          }
        }
      }
    }`;

  private NAME_RESOLVER_QUERY = gql`
    query NameResolver($names: [name!]!) {
      nameResolver(names: $names, bestMatchOnly: true) {
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
    }`;

  constructor(apollo: Apollo) {
    this._apollo = apollo;
  }

  searchNameStrings(searchText: string, pageNumber: number, itemsPerPage: number) {
    console.log(`searchText: ${searchText}, pageNumber: ${pageNumber}`);
    return this._apollo.query<NameStringsQuery, NameStringsQueryVariables>({
      query: this.NAME_STRINGS_QUERY,
      variables: {
        searchTerm: searchText,
        page: pageNumber - 1,
        perPage: itemsPerPage
      }
    }).map(({data}) => data.nameStrings);
  }

  resolveNames(names: string[]) {
    console.log('resolving names: ' + names);
    const namesVar = names.map(n => ({value: n}));
    return this._apollo.query<NameResolverQuery, NameResolverQueryVariables>({
      query: this.NAME_RESOLVER_QUERY,
      variables: {names: namesVar}
    }).map(({data}) => data.nameResolver.responses);
  }

  formatClassificationPath(classification: any) {
    if (!classification || !classification.path) {
      return null;
    }
    if (!classification.pathRanks) {
      return classification.path.replace(/\|/gi, ' > ');
    }
    let result = '';
    const classificationPathChunks = classification.path.split('|');
    const classificationPathRanksChunks = classification.pathRanks.split('|');
    console.log(classificationPathChunks);
    console.log(classificationPathRanksChunks);
    let chunksLen = 0;

    for (let idx = 0; idx < classificationPathChunks.length; idx++) {
      if (classificationPathChunks[idx] === '') {
        continue;
      }

      const classificationPathRankChunk = classificationPathRanksChunks[idx] !== '' ?
        ' (' + classificationPathRanksChunks[idx] + ')' : '';
      result += classificationPathChunks[idx] + classificationPathRankChunk;

      if (idx < classificationPathRanksChunks.length - 1) {
        result += ' > ';
      }

      chunksLen++;
    }
    return chunksLen > 1 ? result : null;
  }

}
