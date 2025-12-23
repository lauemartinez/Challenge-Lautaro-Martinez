import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailDetailsComponent } from './cocktail-details.component';

describe('CocktailDetailsComponent', () => {
  let component: CocktailDetailsComponent;
  let fixture: ComponentFixture<CocktailDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CocktailDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CocktailDetailsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
