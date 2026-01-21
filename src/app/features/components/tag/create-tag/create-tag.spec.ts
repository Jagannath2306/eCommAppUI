import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTag } from './create-tag';

describe('CreateTag', () => {
  let component: CreateTag;
  let fixture: ComponentFixture<CreateTag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTag]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTag);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
