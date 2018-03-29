import {Component, OnInit} from '@angular/core';
import {SearchStatusService} from '../search-box/search-box.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private _searchStatusService: SearchStatusService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this._searchStatusService.searchStatus$.subscribe((searchStatus) => {
      const queryParams: Params = Object.assign({}, this._activatedRoute.snapshot.queryParams);
      queryParams['q'] = searchStatus.searchText;
      queryParams['db'] = searchStatus.dataSourceIds.filter(x => x !== 0).join(',');
      queryParams['bo'] = searchStatus.bestOnly;
      this._router.navigate(
        ['search/' + this._activatedRoute.snapshot.url.join('/')],
        {queryParams: queryParams}
      );
    });
  }

  ngOnInit() {
  }

}
