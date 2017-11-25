import {Component, OnInit} from '@angular/core';
import {ApiClientService} from '../api-client/api-client.service';
import {NameStringEntry} from '../api-client/name-string-entry';
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
  results: Array<NameStringEntry> = [];

  constructor(private _apiClientService: ApiClientService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router) {
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
    this._apiClientService.searchNameStrings(this.searchText)
      .subscribe((nses: Array<NameStringEntry>) => {
        this.results = nses.slice(0, 30);
        console.log('name-strings results:')
        console.log(this.results);
      });
  }
}
