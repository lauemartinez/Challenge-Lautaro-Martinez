import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailHomeComponent } from './cocktail-home.component';

describe('CocktailHomeComponent', () => {
  let component: CocktailHomeComponent;
  let fixture: ComponentFixture<CocktailHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CocktailHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CocktailHomeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
