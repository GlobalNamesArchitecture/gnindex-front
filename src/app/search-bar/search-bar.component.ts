import {Component, OnInit} from '@angular/core';
import {ApiClientService} from '../api-client/api-client.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  providers: [ApiClientService]
})
export class SearchBarComponent implements OnInit {
  searchText = '';

  constructor(private _apiClientService: ApiClientService) {
  }

  ngOnInit() {
  }

  search() {
    this._apiClientService.searchNameStrings(this.searchText);
  }
}
