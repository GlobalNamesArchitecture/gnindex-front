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
  searchText = '';
  results = [];
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
    this.apiClientService.searchNameStrings(this.searchText)
      .subscribe((nses) => {
        this.results = nses.slice(0, 30);
        this.resultIsFetched = true;
        console.log('name-strings results:')
        console.log(this.results);
      });
  }
}
