import {Component, OnInit} from '@angular/core';
import {ApiClientService} from '../api-client/api-client.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-name-strings-search',
  templateUrl: './name-strings-search.component.html',
  styleUrls: ['./name-strings-search.component.scss'],
  providers: [ApiClientService]
})
export class NameStringsSearchComponent implements OnInit {
  searchParamName = 'search';
  pageNumberParamName = 'pn';
  searchText = '';
  pageNumber = 0;
  response = {};
  resultIsFetched = false;
  apiClientService: ApiClientService;

  constructor(apiClientService: ApiClientService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router) {
    this.apiClientService = apiClientService;
  }

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe((params: Params) => {
      this.searchText = params[this.searchParamName];
      this.pageNumber = +params[this.pageNumberParamName];
      if (this.searchText && this.searchText.length > 0) {
        this.update();
      }
    });
  }

  search() {
    const queryParams: Params = Object.assign({}, this._activatedRoute.snapshot.queryParams);
    queryParams[this.searchParamName] = this.searchText;
    this._router.navigate(['.'], {queryParams: queryParams});
  }

  update() {
    this.apiClientService.searchNameStrings(this.searchText, this.pageNumber)
      .subscribe((response) => {
        this.response = response;
        this.resultIsFetched = true;
        console.log('name-strings results:');
        console.log(this.response);
      });
  }
}
