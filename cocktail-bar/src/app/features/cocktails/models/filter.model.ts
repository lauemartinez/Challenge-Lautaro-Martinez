import { Ingredient } from "./cocktail.model";

export interface CocktailFilter {
  id?: string;
  name?: string;
  category?: string;
  alcoholic?: string;
  glass?: string;
  ingredient?: Ingredient;
}