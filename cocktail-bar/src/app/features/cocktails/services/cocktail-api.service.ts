import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CocktailApiResponse } from "../models/cocktail-api.model";
import { IngredientApiResponse } from "../models/ingredient-api.model";

@Injectable({ providedIn: 'root' })
export class CocktailApiService {
  private readonly BASE_URL =
    'https://www.thecocktaildb.com/api/json/v1/1';
  private readonly http = inject(HttpClient);

  searchByName(name: string): Observable<CocktailApiResponse> {
    return this.http.get<CocktailApiResponse>(
      `${this.BASE_URL}/search.php?s=${encodeURIComponent(name)}`
    );
  }

  searchByCategory(category: string): Observable<CocktailApiResponse> {
    return this.http.get<CocktailApiResponse>(
      `${this.BASE_URL}/filter.php?c=${encodeURIComponent(category)}`
    );
  }

  lookupById(id: string): Observable<CocktailApiResponse> {
    return this.http.get<CocktailApiResponse>(
      `${this.BASE_URL}/lookup.php?i=${id}`
    );
  }

  filterByIngredient(ingredient: string): Observable<CocktailApiResponse> {
    return this.http.get<CocktailApiResponse>(
      `${this.BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`
    );
  }

  getIngredientList(): Observable<IngredientApiResponse> {
    return this.http.get<IngredientApiResponse>(
      `${this.BASE_URL}/list.php?i=list`
    );
  }
}
