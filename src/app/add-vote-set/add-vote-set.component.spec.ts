import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVoteSetComponent } from './add-vote-set.component';

describe('AddVoteSetComponent', () => {
  let component: AddVoteSetComponent;
  let fixture: ComponentFixture<AddVoteSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVoteSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVoteSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
