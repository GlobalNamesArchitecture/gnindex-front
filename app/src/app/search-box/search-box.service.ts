import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

export class SearchStatus {
  closeResult: string;
  searchText: string;
  dataSourceIds: number[];
  bestOnly: boolean;

  constructor(searchText: string = '', closeResult: string = '',
              dataSourceIds: number[] = [0], bestOnly: boolean = true) {
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
  private searchStatusSource = new Subject<SearchStatus>();

  searchStatus$ = this.searchStatusSource.asObservable();

  search(searchStatus: SearchStatus) {
    this.searchStatusSource.next(searchStatus);
  }
}
