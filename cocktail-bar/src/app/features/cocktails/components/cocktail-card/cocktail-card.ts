import { Component, input, OnInit } from '@angular/core';
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
export class CocktailCard implements OnInit {
  cocktail = input.required<Cocktail>();

  ngOnInit(): void {
    // Todo
  }
}
