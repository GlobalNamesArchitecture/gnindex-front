import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {NameStringsQuery, NameStringsQueryVariables} from '../graphql/OperationResultTypes';
import gql from 'graphql-tag';
import 'rxjs/add/operator/map';
import {NameStringEntry} from './name-string-entry';

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
        canonicalName {
          id
          value
        }
      }
    }`;

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
    }).map(({data}) => {
      return data.nameStrings.map((x) => {
        return new NameStringEntry(
          x.name.value,
          x.canonicalName.value);
      });
    });
  }

}
