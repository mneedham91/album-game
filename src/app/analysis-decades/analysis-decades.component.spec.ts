import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisDecadesComponent } from './analysis-decades.component';

describe('AnalysisDecadesComponent', () => {
  let component: AnalysisDecadesComponent;
  let fixture: ComponentFixture<AnalysisDecadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisDecadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisDecadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
