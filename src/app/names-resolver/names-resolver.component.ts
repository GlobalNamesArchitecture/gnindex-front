import { Component, OnInit } from '@angular/core';
import {ApiClientService} from '../api-client/api-client.service';

@Component({
  selector: 'app-names-resolver',
  templateUrl: './names-resolver.component.html',
  styleUrls: ['./names-resolver.component.scss'],
  providers: [ApiClientService]
})
export class NamesResolverComponent implements OnInit {
  searchText = '';

  responses = [];

  constructor(private _apiClientService: ApiClientService) { }

  ngOnInit() {
  }

  search() {
    const names = this.searchText.split('\n')
                      .filter(x => x.length > 0);
    this._apiClientService.resolveNames(names)
        .subscribe((responses) => {
          this.responses = responses;
          console.log(this.responses);
        });
  }

}
