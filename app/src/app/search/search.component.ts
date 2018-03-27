import {Component, OnInit} from '@angular/core';
import {SearchStatus, SearchStatusService} from '../search-box/search-box.service';

export enum SearchState {
  Empty = 1,
  NameFilter,
  NameResolver,
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchStateEnum = SearchState;

  searchState: SearchState = SearchState.Empty;

  constructor(private _searchStatusService: SearchStatusService) {
    this._searchStatusService.searchStatus$.subscribe(searchStatus => {
      this.updateSearchState(searchStatus);
    });
    this.updateSearchState(this._searchStatusService.searchStatusLatest());
  }

  updateSearchState(searchStatus: SearchStatus) {
    if (searchStatus.searchText.length === 0) {
      this.searchState = SearchState.Empty;
    } else if (searchStatus.isNameFilterRequest()) {
      this.searchState = SearchState.NameFilter;
    } else {
      this.searchState = SearchState.NameResolver;
    }
    console.log('search state: ' + this.searchState);
  }

  ngOnInit() {
  }

}
