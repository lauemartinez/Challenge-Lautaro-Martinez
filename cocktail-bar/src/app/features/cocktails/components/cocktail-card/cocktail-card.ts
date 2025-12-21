import { Component, input } from '@angular/core';
import { Cocktail } from '../../models/cocktail.model';
import { CommonModule } from '@angular/common';
import { MATERIAL_IMPORTS } from '../../../../shared/material';

@Component({
  selector: 'app-cocktail-card',
  imports: [
    CommonModule,
    MATERIAL_IMPORTS
  ],
  templateUrl: './cocktail-card.html',
  styleUrl: './cocktail-card.scss',
})
export class CocktailCard {
  cocktail = input.required<Cocktail>();
  isFavorite = input.required<boolean>();

  openDetails() {
    // Implementation for opening details
  }
}
