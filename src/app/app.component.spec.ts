import {TestBed, async} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('header nav').textContent).toContain('Name strings');
    expect(compiled.querySelector('header nav').textContent).toContain('Resolver');
    expect(compiled.querySelector('header nav').textContent).toContain('Browse');
    expect(compiled.querySelector('header nav').textContent).toContain('GraphiQL');
    expect(compiled.querySelector('header nav').textContent).toContain('Help');
  }));
});
