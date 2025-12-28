import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CocktailHomeComponent } from './cocktail-home.component';
import { CocktailApiService } from '../../services/cocktail-api.service';
import { FavouritesStore } from '../../../../shared/favourites.store';

describe('CocktailHomeComponent', () => {
  let component: CocktailHomeComponent;
  let fixture: ComponentFixture<CocktailHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CocktailHomeComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                cocktailList: [],
                ingredientList: [],
              },
            },
          },
        },
        {
          provide: CocktailApiService,
          useValue: {
            searchByField: () => of({ drinks: [] }),
            searchByCategory: () => of({ drinks: [] }),
          },
        },
        {
          provide: FavouritesStore,
          useValue: {
            isFavourite: () => false,
            toggleFavourite: () => {},
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CocktailHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
