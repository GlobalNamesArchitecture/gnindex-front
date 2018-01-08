import {Component, OnInit} from '@angular/core';
import {ApiClientService} from '../api-client/api-client.service';
import { NameBrowserTripletsQuery, NameBrowserTripletsQueryVariables } from '../api-client/OperationResultTypes';
import gql from 'graphql-tag';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss'],
  providers: [ApiClientService]
})
export class BrowseComponent implements OnInit {
  letters = [];
  currentTriplets = [];
  currentTripletsRows = [];
  apiClientService: ApiClientService;
  alphabetSize = 26;

  private NAME_BROWSER_QUERY = gql`
    query NameBrowserTriplets($letter: String!) {
      nameBrowser_triplets(letter: $letter) {
        value
        active
      }
    }`;

  constructor(apiClientService: ApiClientService) {
    this.apiClientService = apiClientService;

    for (let letterIdx = 0; letterIdx < this.alphabetSize; letterIdx++) {
      this.letters.push(String.fromCharCode(97 + letterIdx).toUpperCase());
    }
  }

  ngOnInit() {
  }

  selectLetter(letter: string) {
    this.currentTriplets = [];
    console.log(letter);
    this.apiClientService._apollo.query<NameBrowserTripletsQuery, NameBrowserTripletsQueryVariables>({
      query: this.NAME_BROWSER_QUERY,
      variables: {
        letter: letter
      }
    }).subscribe(({data}) => {
      this.currentTriplets = data.nameBrowser_triplets;
      this.currentTripletsRows = [];
      for (let letterIdx1 = 0; letterIdx1 < this.alphabetSize; letterIdx1++) {
        const row = [];
        for (let letterIdx2 = 0; letterIdx2 < this.alphabetSize; letterIdx2++) {
          row.push(this.currentTriplets[letterIdx1 * this.alphabetSize + letterIdx2]);
        }
        this.currentTripletsRows.push(row);
      }
      console.log(this.currentTripletsRows);
    });
  }

  nameStringRequest(triplet: string) {
    const nsString = triplet[0].toUpperCase() + triplet.substr(1).toLowerCase();
    return `/search?q=ns:${nsString}*`;
  }
}
