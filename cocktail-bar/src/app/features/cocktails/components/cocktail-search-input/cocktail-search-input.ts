import { Component, computed, effect, input, output, signal, untracked } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MATERIAL_IMPORTS } from "../../../../shared/material";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { SearchFilter } from "../../models/search-field.model";
import { SearchField } from "../../mappers/search-field.mapper";

@Component({
  selector: "app-cocktail-search-input",
  standalone: true,
  imports: [CommonModule, MATERIAL_IMPORTS],
  templateUrl: "./cocktail-search-input.html",
  styleUrl: "./cocktail-search-input.scss",
})
export class CocktailSearchInput {
  public filterFieldInput = input.required<SearchField>();
  public filterValueInput = input.required<string>();
  public favouriteValueInput = input.required<boolean>();
  public ingredientListInput = input.required<string[]>();

  public filterChange = output<SearchFilter>();
  public favouriteOnlyToggle = output<boolean>();

  protected filterField = signal<SearchField>("name");
  protected filterValueRaw = signal("");
  protected filterValue = signal("");
  protected favouriteValue = signal(false);

  protected inputType = computed<"text" | "number">(() => {
    switch (this.filterField()) {
      case "id":
        return "number";
      default:
        return "text";
    }
  });

  protected filterOptions = [
    { name: "Name", slug: "name" },
    { name: "Ingredient", slug: "ingredient" },
    { name: "ID", slug: "id" },
  ];

  private readonly STORAGE_FILTER_VALUE_KEY = "cocktail-filter-value";
  private readonly STORAGE_FILTER_FIELD_KEY = "cocktail-filter-field";
  private readonly STORAGE_FAVOURITE_FIELD_KEY = "favourite-filter-field";

  constructor() {
    effect(() => {
      this.filterField.set(this.filterFieldInput());
      this.filterValueRaw.set(this.filterValueInput());
      this.favouriteValue.set(this.favouriteValueInput());
    });

    let timer: ReturnType<typeof setTimeout> | undefined;

    effect(() => {
      const raw = this.filterValueRaw();

      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        untracked(() => {
          this.filterValue.set(raw);
        });
      }, 500);
    });

    effect(() => {
      const payload: SearchFilter = {
        field: untracked(() => this.filterField()),
        value: this.filterValue(),
      };

      localStorage.setItem(this.STORAGE_FILTER_VALUE_KEY, payload.value ?? "");

      this.filterChange.emit(payload);
    });

    effect(() => {
      localStorage.setItem(
        this.STORAGE_FILTER_FIELD_KEY,
        this.filterField() ?? ""
      );

      untracked(() => {
        this.filterValueRaw.set("");
      });
    });

    effect(() => {
      const newValue = this.favouriteValue();
      this.favouriteOnlyToggle.emit(newValue);
    });
  }

  protected onFilterValueChange(value: string): void {
    this.filterValueRaw.set(value);
  }

  protected onFilterFieldChange(value: SearchField): void {
    this.filterField.set(value);
  }

  protected onFavouriteChange(event: MatCheckboxChange): void {
    this.favouriteValue.set(event.checked);
    localStorage.setItem(
      this.STORAGE_FAVOURITE_FIELD_KEY,
      event.checked.toString()
    );
  }
}
