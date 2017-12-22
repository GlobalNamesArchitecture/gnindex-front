import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';

import {HttpClientModule} from '@angular/common/http';
import {Apollo, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {NameStringsSearchComponent} from './name-strings-search/name-strings-search.component';
import {FormsModule} from '@angular/forms';
import {NamesResolverComponent} from './names-resolver/names-resolver.component';
import {IndexComponent} from './index/index.component';
import {GraphiqlComponent} from './graphiql/graphiql.component';
import {HelpComponent} from './help/help.component';
import {MarkdownModule} from "angular2-markdown";


@NgModule({
  declarations: [
    AppComponent,
    NameStringsSearchComponent,
    NamesResolverComponent,
    IndexComponent,
    GraphiqlComponent,
    HelpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ApolloModule,
    HttpLinkModule,
    HttpClientModule,
    MarkdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo,
              httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({
        uri: '/api/graphql'
      }),
      cache: new InMemoryCache()
    });
  }
}
