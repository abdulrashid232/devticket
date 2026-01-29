import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputUi } from './input-ui';

describe('InputUi', () => {
  let component: InputUi;
  let fixture: ComponentFixture<InputUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputUi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
