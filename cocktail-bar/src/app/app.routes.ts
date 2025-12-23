import { Routes } from '@angular/router';
import { cocktailHomeResolver } from './features/cocktails/resolvers/cocktail-home.resolver';
import { ingredientListResolver } from './features/cocktails/resolvers/ingredients-list.resolver';
import { cocktailDetailsResolver } from './features/cocktails/resolvers/cocktail-details.resolver';

export const routes: Routes = [
  {
    path: 'cocktails/home',
      loadComponent: () =>
        import('./features/cocktails/pages/cocktail-home/cocktail-home.component')
          .then(m => m.CocktailHomeComponent),
        resolve: {
          cocktailList: cocktailHomeResolver,
          ingredientList: ingredientListResolver
        }
  }, 
  {
    path: 'cocktails/details/:id',
      loadComponent: () =>
        import('./features/cocktails/pages/cocktail-details/cocktail-details.component')
          .then(m => m.CocktailDetailsComponent),
        resolve: {
          cocktail: cocktailDetailsResolver,
        }
  },
  {
    path: '**',
    redirectTo: 'cocktails/home',
  },
];
