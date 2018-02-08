import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ApiClientService} from '../api-client/api-client.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import {SearchStatus, SearchStatusService} from '../search-box/search-box.service';

@Component({
  selector: 'app-name-strings-search',
  templateUrl: './name-strings-search.component.html',
  styleUrls: ['./name-strings-search.component.scss'],
  providers: [ApiClientService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NameStringsSearchComponent implements OnInit {
  itemsPerPage = 30;

  searchParamName = 'q';
  pageNumberParamName = 'pn';
  namesWithSameCanonicalName = [];

  searchText = '';
  response = {};
  resultIsFetched = false;
  pageNumber = 1;
  total: number;
  loading: boolean;
  selectedNameIdx = 0;

  apiClientService: ApiClientService;
  results: Observable<any[]>;

  constructor(apiClientService: ApiClientService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private _searchStatusService: SearchStatusService) {
    this.apiClientService = apiClientService;
    this._searchStatusService.searchStatus$.subscribe(searchStatus => {
      this.goSearch(searchStatus);
    });
  }

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe((params: Params) => {
      this.searchText = params[this.searchParamName];
      this.pageNumber = +(params[this.pageNumberParamName] || 1);
      if (this.searchText && this.searchText.length > 0) {
        this.update(this.pageNumber);
      }
    });
    this.selectItem(0);
  }

  goSearch(searchStatus: SearchStatus) {
    console.log('handling search:');
    console.log(searchStatus);

    this.searchText = searchStatus.searchText;
    if (this.searchText === '') {
      return;
    }
    const queryParams: Params = Object.assign({}, this._activatedRoute.snapshot.queryParams);
    this.selectItem(0);
    queryParams[this.searchParamName] = this.searchText;
    this._router.navigate(
      [this._activatedRoute.snapshot.url.join('/')],
      {queryParams: queryParams}
    );
  }

  update(page: number) {
    this.loading = true;
    this.results = this.apiClientService
      .searchNameStrings(this.searchText, page, this.itemsPerPage)
      .map((response) => {
        this.loading = false;
        this.pageNumber = page;
        this.response = response;
        this.total = this.response['resultsCount'];
        this.resultIsFetched = true;
        console.log('name-strings results:');
        console.log(this.response);
        console.log(this.results);
        return this.response['names'];
      });
  }

  selectItem(idx) {
    this.selectedNameIdx = idx;
    this.namesWithSameCanonicalName = [];

    if (this.resultIsFetched) {
      const result = this.response['names'][this.selectedNameIdx];
      const query = `can:${result.canonicalName.value}`;
      console.log('searching for canonical name: ' + query);
      this.apiClientService
        .searchNameStrings(query, 1, this.itemsPerPage)
        .subscribe((response) => {
          this.namesWithSameCanonicalName = response['names'].map((r) => r['name'].value);
          console.log(this.namesWithSameCanonicalName);
        });
    }
  }

  selectedResult() {
    return this.response['names'][this.selectedNameIdx];
  }

  closingResultCount() {
    return Math.min(this.total, this.itemsPerPage * this.pageNumber);
  }
}
