import { ResolveFn } from "@angular/router";
import { inject } from "@angular/core";
import { Cocktail } from "../models/cocktail.model";
import { CocktailApiService } from "../services/cocktail-api.service";
import { map } from "rxjs";
import { mapApiCocktailToApp } from "../mappers/cocktail.mapper";
import { COCKTAIL_STORAGE_KEYS } from "../../../shared/storage-keys";
import { SearchField } from "../mappers/search-field.mapper";

export const cocktailHomeResolver: ResolveFn<Cocktail[]> = () => {
  const searchService = inject(CocktailApiService);
  const category = "Cocktail";
  
  const filterField = localStorage.getItem(COCKTAIL_STORAGE_KEYS.FILTER_FIELD) as SearchField | null;
  const filterValue = localStorage.getItem(COCKTAIL_STORAGE_KEYS.FILTER_VALUE);

  if(filterField && filterValue) {
    return searchService.searchByField(filterField, filterValue).pipe(
      map((res) => res.drinks && Array.isArray(res.drinks) ? res.drinks : []),
      map((drinks) => drinks.map(mapApiCocktailToApp))
    )
  } else {
    return searchService.searchByCategory(category).pipe(
      map((res) => res.drinks ?? []),
      map((drinks) => drinks.map(mapApiCocktailToApp)),
    );
  }
};
