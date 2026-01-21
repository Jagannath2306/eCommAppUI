import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewColor } from './view-color';

describe('ViewColor', () => {
  let component: ViewColor;
  let fixture: ComponentFixture<ViewColor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewColor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewColor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
