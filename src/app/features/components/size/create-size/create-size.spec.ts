import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSize } from './create-size';

describe('CreateSize', () => {
  let component: CreateSize;
  let fixture: ComponentFixture<CreateSize>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSize]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSize);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
