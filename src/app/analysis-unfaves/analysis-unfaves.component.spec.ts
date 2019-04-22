import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisUnfavesComponent } from './analysis-unfaves.component';

describe('AnalysisUnfavesComponent', () => {
  let component: AnalysisUnfavesComponent;
  let fixture: ComponentFixture<AnalysisUnfavesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisUnfavesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisUnfavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
