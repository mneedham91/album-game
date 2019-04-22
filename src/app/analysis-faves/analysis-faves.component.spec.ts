import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisFavesComponent } from './analysis-faves.component';

describe('AnalysisFavesComponent', () => {
  let component: AnalysisFavesComponent;
  let fixture: ComponentFixture<AnalysisFavesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisFavesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisFavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
