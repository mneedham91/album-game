import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteSetComponent } from './vote-set.component';

describe('VoteSetComponent', () => {
  let component: VoteSetComponent;
  let fixture: ComponentFixture<VoteSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
