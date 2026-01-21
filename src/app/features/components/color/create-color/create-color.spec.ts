import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateColor } from './create-color';

describe('CreateColor', () => {
  let component: CreateColor;
  let fixture: ComponentFixture<CreateColor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateColor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateColor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
