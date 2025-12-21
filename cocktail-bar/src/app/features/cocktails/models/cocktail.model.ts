export interface Cocktail {
  id: string;
  name: string;
  thumbnail: string;
  alcoholic: string;
  glass: string;
  instructions: string;
  ingredients: Ingredient[];
  isFavourite: boolean;
}

export interface Ingredient {
  name: string;
  measure: string | null;
}
