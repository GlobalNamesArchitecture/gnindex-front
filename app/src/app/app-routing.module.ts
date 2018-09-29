import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BrowseComponent} from './browse/browse.component';
import {GraphiqlComponent} from './graphiql/graphiql.component';
import {HelpComponent} from './help/help.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {HomeComponent} from './home/home.component';
import {DatasourceComponent} from './datasource/datasource.component';
import {SearchComponent} from './search/search.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'search', component: SearchComponent},
  {path: 'datasource', component: DatasourceComponent},
  {path: 'datasource/:id', component: DatasourceComponent},
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
