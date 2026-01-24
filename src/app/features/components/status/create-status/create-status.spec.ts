import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStatus } from './create-status';

describe('CreateStatus', () => {
  let component: CreateStatus;
  let fixture: ComponentFixture<CreateStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateStatus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
