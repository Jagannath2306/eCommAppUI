import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSize } from './view-size';

describe('ViewSize', () => {
  let component: ViewSize;
  let fixture: ComponentFixture<ViewSize>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSize]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSize);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
