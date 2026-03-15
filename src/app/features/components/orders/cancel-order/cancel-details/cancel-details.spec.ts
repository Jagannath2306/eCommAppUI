import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelDetails } from './cancel-details';

describe('CancelDetails', () => {
  let component: CancelDetails;
  let fixture: ComponentFixture<CancelDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
