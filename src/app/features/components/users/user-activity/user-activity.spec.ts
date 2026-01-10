import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActivity } from './user-activity';

describe('UserActivity', () => {
  let component: UserActivity;
  let fixture: ComponentFixture<UserActivity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserActivity]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserActivity);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
