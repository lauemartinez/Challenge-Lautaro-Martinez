import { Component, computed, input, output } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../../shared/material';

@Component({
  selector: 'app-toggle-favourite-button',
  imports: [MATERIAL_IMPORTS],
  templateUrl: './toggle-favourite-button.html',
  styleUrl: './toggle-favourite-button.scss',
})
export class ToggleFavouriteButton {
  public isFavourite = input.required<boolean>();
  public toggleFavourite = output<void>();
  
  protected favouriteStyles = computed<{color: string | undefined, icon: string}>(() => {
    return this.isFavourite() ? 
      {color: "primary", icon: 'favorite'} : 
      {color: "secondary", icon: 'favorite_border'};
  });
}
