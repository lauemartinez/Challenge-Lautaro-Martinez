import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FavouritesStore } from '../../../../shared/favourites.store';
import { Cocktail } from '../../models/cocktail.model';
import { EMPTY_COCKTAIL } from '../../models/cocktai-default.model';
import { MATERIAL_IMPORTS } from '../../../../shared/material';

@Component({
  selector: 'app-cocktail-details',
  imports: [MATERIAL_IMPORTS],
  templateUrl: './cocktail-details.component.html',
  styleUrls: ['./cocktail-details.component.scss'],
})
export class CocktailDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly favouritesStore = inject(FavouritesStore);

  protected cocktail = signal<Cocktail>(EMPTY_COCKTAIL);
  protected isFavourite = computed<boolean>(() => 
    this.favouritesStore.isFavourite(this.cocktail().id)
  );
  protected favouriteStyles = computed<{color: string | undefined, icon: string}>(() => {
    return this.isFavourite() ? 
      {color: "primary", icon: 'favorite'} : 
      {color: undefined, icon: 'favorite_border'};
  });

  constructor() {
    this.cocktail.set(this.route.snapshot.data["cocktail"]);
  }

  protected toggleFavourite(): void {
    this.favouritesStore.toggleFavourite(this.cocktail().id);
  }

  protected returnHome(): void {
    this.router.navigate(["/cocktails/home"]);
  }
}
