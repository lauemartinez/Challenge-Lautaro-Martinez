import { Component, effect, input, OnInit, output } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MATERIAL_IMPORTS } from "../../../../shared/material";
import { CommonModule } from "@angular/common";
import { debounceTime, distinctUntilChanged } from "rxjs";
import { MatCheckboxChange } from "@angular/material/checkbox";

@Component({
  selector: "app-cocktail-search-input",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MATERIAL_IMPORTS],
  templateUrl: "./cocktail-search-input.html",
  styleUrl: "./cocktail-search-input.scss",
})
export class CocktailSearchInput implements OnInit {
  public filterField = input.required<string>();
  public filterValue = input.required<string>();
  public favouriteValue = input.required<boolean>();
  public filterValueChange = output<string>();

  protected filterFieldControl = new FormControl("");
  protected filterValueControl = new FormControl("");
  protected filterOptions = [
    { name: "Name", slug: "name" },
    { name: "Ingredient", slug: "ingredient" },
    { name: "ID", slug: "id" },
  ];

  private readonly STORAGE_FILTER_VALUE_KEY = "cocktail-filter-value";
  private readonly STORAGE_FILTER_FIELD_KEY = "cocktail-filter-field";
  private readonly STORAGE_FAVOURITE_FILTER_FIELD_KEY = "favourite-filter-field";

  constructor() {
    effect(() => {
      this.filterValueControl.setValue(this.filterValue() ?? "", {
        emitEvent: false,
      });

      this.filterFieldControl.setValue(this.filterField() ?? "", {
        emitEvent: false,
      });
    });
  }

  ngOnInit() {
    this.filterValueControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.storeSearchParams();
        this.filterValueChange.emit(value ?? "");
      });
  }

  protected onFavouriteChange(event: MatCheckboxChange): void {
    localStorage.setItem(
      this.STORAGE_FAVOURITE_FILTER_FIELD_KEY,
      event.checked.toString()
    );
  }

  private storeSearchParams(): void {
    localStorage.setItem(
      this.STORAGE_FILTER_VALUE_KEY,
      this.filterValueControl.value ?? ""
    );

    localStorage.setItem(
      this.STORAGE_FILTER_FIELD_KEY,
      this.filterFieldControl.value ?? ""
    );
  }
}
