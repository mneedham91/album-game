import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVoteSetsComponent } from './view-vote-sets.component';

describe('ViewVoteSetsComponent', () => {
  let component: ViewVoteSetsComponent;
  let fixture: ComponentFixture<ViewVoteSetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewVoteSetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVoteSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
