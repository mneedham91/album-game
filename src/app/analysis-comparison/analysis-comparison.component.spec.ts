import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisComparisonComponent } from './analysis-comparison.component';

describe('AnalysisComparisonComponent', () => {
  let component: AnalysisComparisonComponent;
  let fixture: ComponentFixture<AnalysisComparisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisComparisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
