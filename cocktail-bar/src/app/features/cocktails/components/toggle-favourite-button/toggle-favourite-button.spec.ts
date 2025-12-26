import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleFavouriteButton } from './toggle-favourite-button';

describe('ToggleFavouriteButton', () => {
  let component: ToggleFavouriteButton;
  let fixture: ComponentFixture<ToggleFavouriteButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleFavouriteButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToggleFavouriteButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
