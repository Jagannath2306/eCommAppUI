import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantStatus } from './variant-status';

describe('VariantStatus', () => {
  let component: VariantStatus;
  let fixture: ComponentFixture<VariantStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VariantStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VariantStatus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
