import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { CocktailApiService } from '../services/cocktail-api.service';
import { map } from 'rxjs';

export const ingredientListResolver: ResolveFn<string[]> = () => {
  const searchService = inject(CocktailApiService);

  return searchService.getIngredientList().pipe(
    map(res => res.drinks ?? []),
    map(ingredients => ingredients.map(ing => ing.strIngredient1))
  );
};