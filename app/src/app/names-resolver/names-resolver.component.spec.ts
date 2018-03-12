import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NamesResolverComponent} from './names-resolver.component';

describe('NamesResolverComponent', () => {
  let component: NamesResolverComponent;
  let fixture: ComponentFixture<NamesResolverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NamesResolverComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NamesResolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
