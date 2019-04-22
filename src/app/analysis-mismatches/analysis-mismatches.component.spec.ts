import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisMismatchesComponent } from './analysis-mismatches.component';

describe('AnalysisMismatchesComponent', () => {
  let component: AnalysisMismatchesComponent;
  let fixture: ComponentFixture<AnalysisMismatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisMismatchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisMismatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
