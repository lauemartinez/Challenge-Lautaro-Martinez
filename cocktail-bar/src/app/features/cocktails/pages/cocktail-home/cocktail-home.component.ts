import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Cocktail } from '../../models/cocktail.model';
import { ActivatedRoute } from '@angular/router';
import { MATERIAL_IMPORTS } from '../../../../shared/material';
import { CocktailCard } from '../../components/cocktail-card/cocktail-card';

@Component({
  standalone: true,
  selector: 'app-cocktail-home',
  imports: [
    CommonModule,
    CocktailCard,
    MATERIAL_IMPORTS
  ],
  templateUrl: './cocktail-home.component.html',
  styleUrl: './cocktail-home.component.scss',
})
export class CocktailHomeComponent implements OnInit {
  cocktailList = signal<Cocktail[]>([]);
  ingredientList = signal<string[]>([]);
  private readonly route = inject(ActivatedRoute);

  constructor() {
    this.cocktailList.set(this.route.snapshot.data['cocktailList']);
    this.ingredientList.set(this.route.snapshot.data['ingredientList']);
  }

  ngOnInit(): void {
    console.log(this.cocktailList());
    console.log(this.ingredientList());
  }
}
