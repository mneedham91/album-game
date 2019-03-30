import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVoteSetComponent } from './view-vote-set.component';

describe('ViewVoteSetComponent', () => {
  let component: ViewVoteSetComponent;
  let fixture: ComponentFixture<ViewVoteSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewVoteSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVoteSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
