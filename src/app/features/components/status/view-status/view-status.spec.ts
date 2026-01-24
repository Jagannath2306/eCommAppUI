import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStatus } from './view-status';

describe('ViewStatus', () => {
  let component: ViewStatus;
  let fixture: ComponentFixture<ViewStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewStatus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
