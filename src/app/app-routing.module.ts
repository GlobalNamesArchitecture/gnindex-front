import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NamesResolverComponent} from './names-resolver/names-resolver.component';
import {NameStringsSearchComponent} from './name-strings-search/name-strings-search.component';
import {IndexComponent} from './index/index.component';
import {GraphiqlComponent} from './graphiql/graphiql.component';
import {HelpComponent} from './help/help.component';

const routes: Routes = [
  {path: '', component: NameStringsSearchComponent},
  {path: 'resolver', component: NamesResolverComponent},
  {path: 'index', component: IndexComponent},
  {path: 'graphiql', component: GraphiqlComponent},
  {path: 'help', component: HelpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
