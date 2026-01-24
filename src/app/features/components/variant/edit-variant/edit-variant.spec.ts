import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVariant } from './edit-variant';

describe('EditVariant', () => {
  let component: EditVariant;
  let fixture: ComponentFixture<EditVariant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditVariant]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditVariant);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
