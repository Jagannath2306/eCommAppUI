import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVariantStatus } from './create-variant-status';

describe('CreateVariantStatus', () => {
  let component: CreateVariantStatus;
  let fixture: ComponentFixture<CreateVariantStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateVariantStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateVariantStatus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
