import { Component, OnInit } from '@angular/core';
import {ApiClientService} from '../api-client/api-client.service';

@Component({
  selector: 'app-names-resolver',
  templateUrl: './names-resolver.component.html',
  styleUrls: ['./names-resolver.component.scss'],
  providers: [ApiClientService]
})
export class NamesResolverComponent implements OnInit {
  searchText = 'Homo sapiens\nSalinator solida';
  responses = [];
  apiClientService: ApiClientService;

  constructor(apiClientService: ApiClientService) {
    this.apiClientService = apiClientService;
  }

  ngOnInit() {
  }

  search() {
    const names = this.searchText.split('\n')
                      .filter(x => x.length > 0);
    this.apiClientService.resolveNames(names)
        .subscribe((responses) => {
          this.responses = responses;
          console.log(this.responses);
        });
  }

}
