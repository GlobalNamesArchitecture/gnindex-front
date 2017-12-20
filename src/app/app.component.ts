import {Component, OnInit} from '@angular/core';
import {ApiClientService} from './api-client/api-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ApiClientService]
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private _apiClientService: ApiClientService) {
  }

  ngOnInit() {
    this._apiClientService.performSearch('can:Homo');
  }
}
