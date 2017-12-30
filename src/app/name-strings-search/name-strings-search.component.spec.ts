import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NameStringsSearchComponent} from './name-strings-search.component';
import {FormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {ApolloModule} from 'apollo-angular';
import {Routes} from '@angular/router';

const routes: Routes = [
  {path: 'search', component: NameStringsSearchComponent},
];

describe('NameStringsSearchComponent', () => {
  let component: NameStringsSearchComponent;
  let fixture: ComponentFixture<NameStringsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NameStringsSearchComponent],
      // imports: [FormsModule, NgxPaginationModule, ApolloModule, HttpLinkModule, HttpClientModule, routes]
      imports: [FormsModule, NgxPaginationModule, ApolloModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameStringsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
