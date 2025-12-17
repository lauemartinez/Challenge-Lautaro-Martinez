export interface Cocktail {
  id: string;
  name: string;
  thumbnail: string;
  category: string;
  alcoholic: string;
  glass: string;
  instructions: string;
  ingredients: Ingredient[];
}

export interface Ingredient {
  name: string;
  measure: string | null;
}
