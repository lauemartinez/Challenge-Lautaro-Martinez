import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { CocktailApiService } from '../services/cocktail-api.service';
import { map } from 'rxjs';
import { Cocktail } from '../models/cocktail.model';
import { mapApiCocktailToApp } from '../mappers/cocktail.mapper';

export const cocktailDetailsResolver: ResolveFn<Cocktail> = (route) => {
  const searchService = inject(CocktailApiService);
  const id = route.paramMap.get('id')!;

  return searchService.getCocktailDetails(id).pipe(
    map(res => res.drinks ?? []),
    map((drinks) => drinks.map(mapApiCocktailToApp)),
    map((cocktails) => cocktails[0]),
  );
};