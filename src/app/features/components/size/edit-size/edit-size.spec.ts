import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSize } from './edit-size';

describe('EditSize', () => {
  let component: EditSize;
  let fixture: ComponentFixture<EditSize>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSize]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSize);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
