import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Cocktail } from '../../models/cocktail.model';
import { ActivatedRoute } from '@angular/router';
import { MATERIAL_IMPORTS } from '../../../../shared/material';
import { CocktailCard } from '../../components/cocktail-card/cocktail-card';
import { CocktailSearchInput } from '../../components/cocktail-search-input/cocktail-search-input';
import { CocktailApiService } from '../../services/cocktail-api.service';
import { map } from 'rxjs';
import { mapApiCocktailToApp } from '../../mappers/cocktail.mapper';
import { SearchField } from '../../mappers/search-field.mapper';

@Component({
  standalone: true,
  selector: 'app-cocktail-home',
  imports: [
    CommonModule,
    CocktailSearchInput,
    CocktailCard,
    MATERIAL_IMPORTS
  ],
  templateUrl: './cocktail-home.component.html',
  styleUrl: './cocktail-home.component.scss',
})
export class CocktailHomeComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly searchService = inject(CocktailApiService);

  protected cocktailList = signal<Cocktail[]>([]);
  protected ingredientList = signal<string[]>([]);
  protected isLoading = signal<boolean>(false);
  protected filterField: SearchField = 'name';
  protected filterValue = '';

  constructor() {
    this.cocktailList.set(this.route.snapshot.data['cocktailList']);
    this.ingredientList.set(this.route.snapshot.data['ingredientList']);
  }

  onFilterValueChange(searchValue: string): void {
    this.isLoading.set(true);
    if (!searchValue) {
      this.cocktailList.set(this.route.snapshot.data['cocktailList']);
      this.isLoading.set(false);
    } else {
      this.filterCocktails(searchValue);
    }
  }

  filterCocktails(searchValue: string ): void {
    this.searchService.searchByField(this.filterField, searchValue).pipe(
      map(res => res.drinks ?? []),
      map(drinks => drinks.map(mapApiCocktailToApp))
    ).subscribe(cocktails => {
      this.cocktailList.set(cocktails);
      this.isLoading.set(false);
    });
  }
}
