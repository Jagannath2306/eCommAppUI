import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTag } from './view-tag';

describe('ViewTag', () => {
  let component: ViewTag;
  let fixture: ComponentFixture<ViewTag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewTag]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTag);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
