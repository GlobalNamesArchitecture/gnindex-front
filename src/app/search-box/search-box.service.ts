import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

export class SearchStatus {
  closeResult: string;
  searchText: string;

  constructor(searchText: string = '', closeResult: string = '') {
    this.closeResult = closeResult;
    this.searchText = searchText;
  }

  isMultiline() {
    return this.searchText.indexOf('\n') > 0;
  }
}

@Injectable()
export class SearchStatusService {
  private searchStatusSource = new Subject<SearchStatus>();

  searchStatus$ = this.searchStatusSource.asObservable();

  search(searchStatus: SearchStatus) {
    this.searchStatusSource.next(searchStatus);
  }
}
