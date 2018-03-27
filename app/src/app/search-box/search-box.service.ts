import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

export class SearchStatus {
  closeResult: string;
  searchText: string;
  dataSourceIds: number[];
  bestOnly: boolean;

  constructor(searchText: string = '',
              dataSourceIds: number[] = [0],
              bestOnly: boolean = true,
              closeResult: string = '') {
    this.closeResult = closeResult;
    this.searchText = searchText;
    this.dataSourceIds = dataSourceIds;
    this.bestOnly = bestOnly;
  }

  isMultiline(): boolean {
    if (this.searchText === undefined) {
      return undefined;
    }
    return this.searchText.indexOf('\n') > 0;
  }

  isNameFilterRequest(): boolean {
    if (this.searchText === undefined) {
      return undefined;
    }
    return this.searchText.indexOf(':') > 0;
  }

  chunks(): string[] {
    if (this.searchText === undefined) {
      return undefined;
    }
    return this.searchText.split('\n');
  }
}

@Injectable()
export class SearchStatusService {
  private _searchStatusSource = new Subject<SearchStatus>();
  private _searchStatusLatest: SearchStatus = new SearchStatus();

  searchStatus$ = this._searchStatusSource.asObservable();

  search(searchStatus: SearchStatus) {
    this._searchStatusLatest = searchStatus;
    this._searchStatusSource.next(searchStatus);
  }

  searchStatusLatest() {
    return this._searchStatusLatest;
  }
}
