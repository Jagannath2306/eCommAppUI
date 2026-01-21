import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditColor } from './edit-color';

describe('EditColor', () => {
  let component: EditColor;
  let fixture: ComponentFixture<EditColor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditColor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditColor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
