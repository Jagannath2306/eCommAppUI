import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVariantStatus } from './edit-variant-status';

describe('EditVariantStatus', () => {
  let component: EditVariantStatus;
  let fixture: ComponentFixture<EditVariantStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditVariantStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditVariantStatus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
