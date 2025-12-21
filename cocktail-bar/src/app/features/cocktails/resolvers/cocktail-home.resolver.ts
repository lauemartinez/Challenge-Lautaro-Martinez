import { ResolveFn } from "@angular/router";
import { inject } from "@angular/core";
import { Cocktail } from "../models/cocktail.model";
import { CocktailApiService } from "../services/cocktail-api.service";
import { map } from "rxjs";
import { mapApiCocktailToApp } from "../mappers/cocktail.mapper";

export const cocktailHomeResolver: ResolveFn<Cocktail[]> = () => {
  const searchService = inject(CocktailApiService);
  const category = "Cocktail";

  return searchService.searchByCategory(category).pipe(
    map((res) => res.drinks ?? []),
    map((drinks) => drinks.map(mapApiCocktailToApp)),
  );
};
