import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPermission } from './user-permission';

describe('UserPermission', () => {
  let component: UserPermission;
  let fixture: ComponentFixture<UserPermission>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPermission]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPermission);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
