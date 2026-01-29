import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVariantStatus } from './view-variant-status';

describe('ViewVariantStatus', () => {
  let component: ViewVariantStatus;
  let fixture: ComponentFixture<ViewVariantStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewVariantStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewVariantStatus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
