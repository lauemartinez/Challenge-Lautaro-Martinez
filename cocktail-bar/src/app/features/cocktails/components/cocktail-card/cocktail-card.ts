import { Component, input } from '@angular/core';
import { Cocktail } from '../../models/cocktail.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cocktail-card',
  imports: [CommonModule],
  templateUrl: './cocktail-card.html',
  styleUrl: './cocktail-card.scss',
})
export class CocktailCard {
  cocktail = input.required<Cocktail>();
}
