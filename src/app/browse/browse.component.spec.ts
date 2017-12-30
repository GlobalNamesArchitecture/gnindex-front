import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BrowseComponent} from './browse.component';
import {HttpLinkModule} from 'apollo-angular-link-http';
import {ApolloModule} from 'apollo-angular';
import {HttpClientModule} from '@angular/common/http';

describe('BrowseComponent', () => {
  let component: BrowseComponent;
  let fixture: ComponentFixture<BrowseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BrowseComponent],
      imports: [ApolloModule, HttpLinkModule, HttpClientModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('contain all letters', () => {
    fixture = TestBed.createComponent(BrowseComponent);
    component = fixture.componentInstance;
    const element = fixture.debugElement.nativeElement;
    fixture.detectChanges();

    for (let letterIdx = 0; letterIdx < 26; letterIdx++) {
      const letter = String.fromCharCode(97 + letterIdx).toUpperCase();
      expect(element.textContent).toContain(' ' + letter + '\n');
    }
  });
});
