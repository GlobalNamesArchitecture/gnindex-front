import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NamesResolverComponent} from './names-resolver/names-resolver.component';
import {NameStringsSearchComponent} from './name-strings-search/name-strings-search.component';
import {BrowseComponent} from './browse/browse.component';
import {GraphiqlComponent} from './graphiql/graphiql.component';
import {HelpComponent} from './help/help.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'search', component: NameStringsSearchComponent},
  {path: 'resolver', component: NamesResolverComponent},
  {path: 'browse', component: BrowseComponent},
  {path: 'graphiql', component: GraphiqlComponent},
  {path: 'help', component: HelpComponent},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
