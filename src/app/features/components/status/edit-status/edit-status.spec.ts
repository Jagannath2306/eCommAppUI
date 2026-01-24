import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStatus } from './edit-status';

describe('EditStatus', () => {
  let component: EditStatus;
  let fixture: ComponentFixture<EditStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditStatus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
