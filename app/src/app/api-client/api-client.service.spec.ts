import {TestBed, inject} from '@angular/core/testing';

import {ApiClientService} from './api-client.service';
import {ApolloModule} from 'apollo-angular';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {HttpClientModule} from '@angular/common/http';

describe('ApiClientService', () => {
  const initApollo = (service: ApiClientService, httpLink: HttpLink) => {
    service._apollo.create({
      link: httpLink.create({
        uri: '/api/graphql'
      }),
      cache: new InMemoryCache()
    });
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloModule, HttpLinkModule, HttpClientModule],
      providers: [ApiClientService]
    });
  });

  it('should be created', inject([ApiClientService], (service: ApiClientService) => {
    expect(service).toBeTruthy();
  }));

  /*
  it('should fetch name strings', injectAsync([ApiClientService, HttpLink],
    async((service: ApiClientService, httpLink: HttpLink) => {

      initApollo(service, httpLink);
      let response: any;
      service.searchNameStrings('can:Homo', 1, 3).toPromise()
        // .subscribe((resp) => {
        .then((resp) => {
          console.log(resp);
          response = resp;
          // expect(response.page).toEqual(0);
          // expect(response.page).toEqual(1);
        });
    }))
  );
    */
});
