import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVariant } from './view-variant';

describe('ViewVariant', () => {
  let component: ViewVariant;
  let fixture: ComponentFixture<ViewVariant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewVariant]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewVariant);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
