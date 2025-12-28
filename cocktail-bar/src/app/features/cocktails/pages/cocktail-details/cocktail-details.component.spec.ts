import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { CocktailDetailsComponent } from './cocktail-details.component';
import { FavouritesStore } from '../../../../shared/favourites.store';
import { EMPTY_COCKTAIL } from '../../models/cocktai-default.model';

describe('CocktailDetailsComponent', () => {
  let component: CocktailDetailsComponent;
  let fixture: ComponentFixture<CocktailDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CocktailDetailsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                cocktail: EMPTY_COCKTAIL,
              },
            },
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: () => {},
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

    fixture = TestBed.createComponent(CocktailDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
