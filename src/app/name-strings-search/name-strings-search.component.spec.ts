import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameStringsSearchComponent } from './name-strings-search.component';

describe('NameStringsSearchComponent', () => {
  let component: NameStringsSearchComponent;
  let fixture: ComponentFixture<NameStringsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameStringsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameStringsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
