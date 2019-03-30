import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVoteSetComponent } from './edit-vote-set.component';

describe('EditVoteSetComponent', () => {
  let component: EditVoteSetComponent;
  let fixture: ComponentFixture<EditVoteSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVoteSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVoteSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
