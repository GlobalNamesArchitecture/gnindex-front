import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {NameStringsQuery, NameStringsQueryVariables} from '../graphql/OperationResultTypes';
import gql from 'graphql-tag';

class NameStringEntry {
  name: string;
  canonicalName: string;

  constructor(name: string,
              canonicalName: string) {
    this.name = name;
    this.canonicalName = canonicalName;
  }
}

@Injectable()
export class ApiClientService {
  private _apollo: Apollo;
  result = [];
  private NAME_STRINGS_QUERY = gql`
    query ($searchTerm: String!) {
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
    this._apollo.query<NameStringsQuery, NameStringsQueryVariables>({
      query: this.NAME_STRINGS_QUERY,
      variables: {
        searchTerm: searchText
      }
    }).subscribe(({data}) => {
      this.result = data.nameStrings.map((x) => {
        return new NameStringEntry(x.name.value, x.canonicalName.value);
      });
      console.log(this.result);
    });
  }

}
