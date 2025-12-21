import { CocktailApiDto } from '../models/cocktail-api.model';
import { Cocktail, Ingredient } from '../models/cocktail.model';

export function mapApiCocktailToApp(
  dto: CocktailApiDto
): Cocktail {
  return {
    id: dto.idDrink,
    name: dto.strDrink,
    thumbnail: dto.strDrinkThumb,
    alcoholic: dto.strAlcoholic,
    glass: dto.strGlass,
    instructions: dto.strInstructions,
    ingredients: extractIngredients(dto),
    isFavourite: false,
  };
}

function extractIngredients(dto: CocktailApiDto): Ingredient[] {
  const ingredients: Ingredient[] = [];
  const MAX_INGREDIENTS = 15;

  for (let i = 1; i <= MAX_INGREDIENTS; i++) {
    const name = dto[`strIngredient${i}` as keyof CocktailApiDto] as string | null;
    const measure = dto[`strMeasure${i}` as keyof CocktailApiDto] as string | null;

    if (name) {
      ingredients.push({
        name: name.trim(),
        measure: measure?.trim() || null,
      });
    }
  }

  return ingredients;
}
