import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HelpComponent} from './help.component';
import {MarkdownModule} from 'angular2-markdown';

describe('HelpComponent', () => {
  let component: HelpComponent;
  let fixture: ComponentFixture<HelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HelpComponent],
      imports: [MarkdownModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain help text', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('markdown').attributes.path.value).toEqual('/assets/help.md');
  });
});
