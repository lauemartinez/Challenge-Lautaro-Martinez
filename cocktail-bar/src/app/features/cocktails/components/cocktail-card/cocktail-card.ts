import { Component, inject, input, output } from "@angular/core";
import { Cocktail } from "../../models/cocktail.model";
import { CommonModule } from "@angular/common";
import { MATERIAL_IMPORTS } from "../../../../shared/material";
import { Router } from "@angular/router";

@Component({
  selector: "app-cocktail-card",
  imports: [CommonModule, MATERIAL_IMPORTS],
  templateUrl: "./cocktail-card.html",
  styleUrl: "./cocktail-card.scss",
})
export class CocktailCard {
  private readonly router = inject(Router);

  public cocktail = input.required<Cocktail>();
  public toggleFavourite = output<string>();

  protected openDetails(): void {
    this.router.navigate(["/cocktails/details", this.cocktail().id]);
  }

  protected changeFavourite(): void {
    this.toggleFavourite.emit(this.cocktail().id);
  }
}
