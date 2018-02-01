import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

export class SearchStatus {
  closeResult: string;
  searchText: string;

  constructor(searchText: string = '', closeResult: string = '') {
    this.closeResult = closeResult;
    this.searchText = searchText;
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
  private searchStatusSource = new Subject<SearchStatus>();

  searchStatus$ = this.searchStatusSource.asObservable();

  search(searchStatus: SearchStatus) {
    this.searchStatusSource.next(searchStatus);
  }
}
