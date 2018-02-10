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
import {BrowseComponent} from './browse/browse.component';
import {GraphiqlComponent} from './graphiql/graphiql.component';
import {HelpComponent} from './help/help.component';
import {MarkdownModule} from 'angular2-markdown';
import {NgxPaginationModule} from 'ngx-pagination';
import {NotFoundComponent} from './not-found/not-found.component';
import {HomeComponent} from './home/home.component';
import {DatasourceComponent} from './datasource/datasource.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SearchBoxComponent, SearchTextGetter} from './search-box/search-box';
import {OcticonDirective} from './oction/OctionDirective';
import {SearchComponent} from './search/search.component';
import {SearchHelpComponent} from './search-help/search-help.component';
import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NameStringsSearchComponent,
    NamesResolverComponent,
    BrowseComponent,
    GraphiqlComponent,
    HelpComponent,
    NotFoundComponent,
    DatasourceComponent,
    SearchBoxComponent,
    OcticonDirective,
    SearchTextGetter,
    SearchComponent,
    SearchHelpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ApolloModule,
    HttpLinkModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    NgxPaginationModule,
    NgbModule.forRoot(),
    MultiselectDropdownModule,
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
