import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CocktailApiResponse } from "../models/cocktail-api.model";
import { IngredientApiResponse } from "../models/ingredient-api.model";
import { mapSearchFieldToSlug, SearchField } from "../mappers/search-field.mapper";

@Injectable({ providedIn: "root" })
export class CocktailApiService {
  private readonly BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1";
  private readonly http = inject(HttpClient);
  
  searchByCategory(category: string): Observable<CocktailApiResponse> {
    return this.http.get<CocktailApiResponse>(
      `${this.BASE_URL}/filter.php?c=${encodeURIComponent(category)}`
    );
  }

  searchByField(field: SearchField, value: string): Observable<CocktailApiResponse> {
    const { field: queryField, method } = mapSearchFieldToSlug(field);
    return this.http.get<CocktailApiResponse>(
      `${this.BASE_URL}/${method}.php?${queryField}=${encodeURIComponent(value)}`
    );
  }

  getIngredientList(): Observable<IngredientApiResponse> {
    return this.http.get<IngredientApiResponse>(
      `${this.BASE_URL}/list.php?i=list`
    );
  }

  getCocktailDetails(id: string): Observable<CocktailApiResponse> {
    return this.http.get<CocktailApiResponse>(
      `${this.BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`
    );
  }
}
