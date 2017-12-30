import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GraphiqlComponent} from './graphiql.component';

describe('GraphiqlComponent', () => {
  let component: GraphiqlComponent;
  let fixture: ComponentFixture<GraphiqlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GraphiqlComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphiqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
