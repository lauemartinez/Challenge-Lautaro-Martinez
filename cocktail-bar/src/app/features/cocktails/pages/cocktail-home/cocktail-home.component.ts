import { CommonModule } from "@angular/common";
import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { Cocktail } from "../../models/cocktail.model";
import { ActivatedRoute } from "@angular/router";
import { MATERIAL_IMPORTS } from "../../../../shared/material";
import { CocktailCard } from "../../components/cocktail-card/cocktail-card";
import { CocktailSearchInput } from "../../components/cocktail-search-input/cocktail-search-input";
import { CocktailApiService } from "../../services/cocktail-api.service";
import { map } from "rxjs";
import { mapApiCocktailToApp } from "../../mappers/cocktail.mapper";
import { SearchField } from "../../mappers/search-field.mapper";
import { SearchFilter } from "../../models/search-field.model";
import { FavouritesStore } from "../../../../shared/favourites.store";
import { COCKTAIL_STORAGE_KEYS } from "../../../../shared/storage-keys";

@Component({
  standalone: true,
  selector: "app-cocktail-home",
  imports: [CommonModule, CocktailSearchInput, CocktailCard, MATERIAL_IMPORTS],
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

    if (!onlyFavs) {
      return cocktails;
    }

    return cocktails.filter((c) => c.isFavourite);
  });

  constructor() {
    this.cocktailList.set(this.route.snapshot.data["cocktailList"]);
    this.ingredientList.set(this.route.snapshot.data["ingredientList"]);
  }

  ngOnInit(): void {
    const filterField = localStorage.getItem(COCKTAIL_STORAGE_KEYS.FILTER_FIELD) as SearchField | null;
    const filterValue = localStorage.getItem(COCKTAIL_STORAGE_KEYS.FILTER_VALUE);
    const favouriteOnly = localStorage.getItem(COCKTAIL_STORAGE_KEYS.FAVOURITE_FIELD);

    this.filterFieldInput.set(filterField ?? "name");
    this.filterValueInput.set(filterValue ?? "");
    this.favouriteValueInput.set(favouriteOnly === "true");
    this.showOnlyFavourites.set(favouriteOnly === "true");
  }

  protected onFilterValueChange(payload: SearchFilter): void {
    this.isLoading.set(true);
    if (!payload.value) {
      this.cocktailList.set(this.route.snapshot.data["cocktailList"]);
      this.isLoading.set(false);
    } else {
      this.filterCocktails(payload);
    }
  }

  protected onFavouriteOnlyToggle(favouriteOnly: boolean): void {
    this.showOnlyFavourites.set(favouriteOnly);
  }

  protected toggleFavourite(cocktailId: string): void {
    this.favouritesStore.toggleFavourite(cocktailId);
  }

  private filterCocktails(payload: SearchFilter): void {
    this.searchService
      .searchByField(payload.field, payload.value)
      .pipe(
        map((res) =>
          res.drinks && Array.isArray(res.drinks) ? res.drinks : []
        ),
        map((drinks) => drinks.map(mapApiCocktailToApp))
      )
      .subscribe((cocktails) => {
        this.cocktailList.set(cocktails);
        this.isLoading.set(false);
      });
  }
}
