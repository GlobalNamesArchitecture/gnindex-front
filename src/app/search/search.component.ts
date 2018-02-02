import { Component, OnInit } from '@angular/core';
import {SearchStatusService} from '../search-box/search-box.service';

export enum SearchState {
  Empty = 1,
  NameFilter,
  NameResolver,
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchStateEnum = SearchState;

  searchState: SearchState = SearchState.Empty;

  constructor(private _searchStatusService: SearchStatusService) {
    this._searchStatusService.searchStatus$.subscribe(searchStatus => {
      if (searchStatus.searchText.length === 0) {
        this.searchState = SearchState.Empty;
      } else if (searchStatus.isNameFilterRequest()) {
        this.searchState = SearchState.NameFilter;
      } else {
        this.searchState = SearchState.NameResolver;
      }
      console.log(this.searchState);
    });
  }

  ngOnInit() {
  }

}
