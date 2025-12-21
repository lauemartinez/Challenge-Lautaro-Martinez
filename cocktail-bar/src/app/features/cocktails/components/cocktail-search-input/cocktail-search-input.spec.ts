import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailSearchInput } from './cocktail-search-input';

describe('CocktailSearchInput', () => {
  let component: CocktailSearchInput;
  let fixture: ComponentFixture<CocktailSearchInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CocktailSearchInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CocktailSearchInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
