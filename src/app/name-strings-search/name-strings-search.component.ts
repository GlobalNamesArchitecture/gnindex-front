import {Component, OnInit} from '@angular/core';
import {ApiClientService} from '../api-client/api-client.service';
import {NameStringEntry} from '../api-client/name-string-entry';

@Component({
  selector: 'app-name-strings-search',
  templateUrl: './name-strings-search.component.html',
  styleUrls: ['./name-strings-search.component.scss'],
  providers: [ApiClientService]
})
export class NameStringsSearchComponent implements OnInit {
  searchText = '';
  _apiClientService: ApiClientService;
  results: Array<NameStringEntry> = [];

  constructor(apiClientService: ApiClientService) {
    this._apiClientService = apiClientService;
  }

  ngOnInit() {
  }

  search() {
    this._apiClientService.searchNameStrings(this.searchText)
      .subscribe((nses: Array<NameStringEntry>) => {
        this.results = nses;
        console.log(this.results);
      });
  }
}
