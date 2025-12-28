import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailCard } from './cocktail-card';

describe('CocktailCard', () => {
  let component: CocktailCard;
  let fixture: ComponentFixture<CocktailCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CocktailCard],
    }).compileComponents();

    fixture = TestBed.createComponent(CocktailCard);

    fixture.componentRef.setInput('cocktail', {
      id: '1',
      name: 'Test cocktail',
      image: '',
      ingredients: [],
      instructions: '',
      isFavourite: false,
    });

    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
