import { CommonModule } from "@angular/common";
import { Component, computed, effect, inject, OnInit, signal, untracked } from "@angular/core";
import { Cocktail } from "../../models/cocktail.model";
import { ActivatedRoute } from "@angular/router";
import { MATERIAL_IMPORTS } from "../../../../shared/material";
import { CocktailCard } from "../../components/cocktail-card/cocktail-card";
import { CocktailSearchInput } from "../../components/cocktail-search-input/cocktail-search-input";
import { CocktailApiService } from "../../services/cocktail-api.service";
import { map, Observable } from "rxjs";
import { mapApiCocktailToApp } from "../../mappers/cocktail.mapper";
import { SearchField } from "../../mappers/search-field.mapper";
import { SearchFilter } from "../../models/search-field.model";
import { FavouritesStore } from "../../../../shared/favourites.store";
import { COCKTAIL_STORAGE_KEYS } from "../../../../shared/storage-keys";
import { CocktailApiResponse } from "../../models/cocktail-api.model";
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  standalone: true,
  selector: "app-cocktail-home",
  imports: [
    CommonModule, 
    CocktailSearchInput, 
    CocktailCard, 
    InfiniteScrollDirective,  
    MATERIAL_IMPORTS
  ],
  templateUrl: "./cocktail-home.component.html",
  styleUrl: "./cocktail-home.component.scss",
})
export class CocktailHomeComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly searchService = inject(CocktailApiService);
  private readonly favouritesStore = inject(FavouritesStore);

  protected cocktailList = signal<Cocktail[]>([]);
  protected ingredientList = signal<string[]>([]);
  protected isLoading = signal<boolean>(false);

  protected filterFieldInput = signal<SearchField>("name");
  protected filterValueInput = signal<string>("");
  protected favouriteValueInput = signal<boolean>(false);
  protected showOnlyFavourites = signal(false);
  
  protected readonly PAGE_SIZE = 24;
  protected visibleCount = signal<number>(
    Number(localStorage.getItem(COCKTAIL_STORAGE_KEYS.VISIBLE_COUNT)) || this.PAGE_SIZE
  );

  protected cocktailsWithFavourite = computed(() => {
    const cocktails = this.cocktailList();

    return cocktails.map((cocktail) => ({
      ...cocktail,
      isFavourite: this.favouritesStore.isFavourite(cocktail.id),
    }));
  });

  protected visibleCocktails = computed(() => {
    const cocktails = this.cocktailsWithFavourite();
    const onlyFavs = this.showOnlyFavourites();

    const filtered = onlyFavs
      ? cocktails.filter(c => c.isFavourite)
      : cocktails;

    return filtered.slice(0, this.visibleCount());
  });

  constructor() {
    this.cocktailList.set(this.route.snapshot.data["cocktailList"]);
    this.ingredientList.set(this.route.snapshot.data["ingredientList"]);

    effect(() => {
      localStorage.setItem(COCKTAIL_STORAGE_KEYS.VISIBLE_COUNT, this.visibleCount().toString());
    });
  }

  ngOnInit(): void {
    const filterField = localStorage.getItem(COCKTAIL_STORAGE_KEYS.FILTER_FIELD) as SearchField | null;
    const filterValue = localStorage.getItem(COCKTAIL_STORAGE_KEYS.FILTER_VALUE);
    const favouriteOnly = localStorage.getItem(COCKTAIL_STORAGE_KEYS.FAVOURITE_FIELD);

    untracked(() => {
      this.filterFieldInput.set(filterField ?? "name");
      this.filterValueInput.set(filterValue ?? "");
      this.favouriteValueInput.set(favouriteOnly === "true");
      this.showOnlyFavourites.set(favouriteOnly === "true");
    });
  }

  protected onFilterValueChange(payload: SearchFilter): void {
    this.isLoading.set(true);
    console.log('onFilterValueChange');
    this.visibleCount.set(this.PAGE_SIZE);
    if (!payload.value) {
      this.getAllCocktails();
    } else {
      this.filterCocktails(payload);
    }
  }

  protected onFavouriteOnlyToggle(favouriteOnly: boolean): void {
    this.showOnlyFavourites.set(favouriteOnly);
    console.log('onFavouriteOnlyToggle');
    this.visibleCount.set(this.PAGE_SIZE);
  }

  protected toggleFavourite(cocktailId: string): void {
    this.favouritesStore.toggleFavourite(cocktailId);
  }

  private filterCocktails(payload: SearchFilter): void {
    this.handleCocktailRequest(
      this.searchService.searchByField(payload.field, payload.value)
    );
  }

  private getAllCocktails(): void {
    this.handleCocktailRequest(
      this.searchService.searchByCategory('Cocktail')
    );
  }

  private handleCocktailRequest(request$: Observable<CocktailApiResponse>): void {
    this.isLoading.set(true);

    request$
      .pipe(
        map(res => Array.isArray(res?.drinks) ? res.drinks : []),
        map(drinks => drinks.map(mapApiCocktailToApp))
      )
      .subscribe(cocktails => {
        this.cocktailList.set(cocktails);
        this.isLoading.set(false);
      });
  }

  protected loadMore(): void {
    this.visibleCount.update(v =>
      Math.min(v + this.PAGE_SIZE, this.cocktailList().length)
    );
  }
    
}
