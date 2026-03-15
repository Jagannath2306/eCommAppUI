import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusDetails } from './status-details';

describe('StatusDetails', () => {
  let component: StatusDetails;
  let fixture: ComponentFixture<StatusDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
