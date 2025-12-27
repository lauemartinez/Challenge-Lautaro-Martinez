import { Component, computed, effect, inject, input, OnInit, output, signal, untracked } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MATERIAL_IMPORTS } from "../../../../shared/material";
import { SearchFilter } from "../../models/search-field.model";
import { SearchField } from "../../mappers/search-field.mapper";
import { BreakpointService } from "../../../../shared/breakpoint.service";
import { ToggleFavouriteButton } from "../toggle-favourite-button/toggle-favourite-button";
import { COCKTAIL_STORAGE_KEYS } from "../../../../shared/storage-keys";

@Component({
  selector: "app-cocktail-search-input",
  standalone: true,
  imports: [
    CommonModule, 
    ToggleFavouriteButton,
    MATERIAL_IMPORTS
  ],
  templateUrl: "./cocktail-search-input.html",
  styleUrl: "./cocktail-search-input.scss",
})
export class CocktailSearchInput implements OnInit {
  protected readonly breakpoints = inject(BreakpointService);
  private initializedDict = {
    filter: false, favourite: false,
  };

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

      localStorage.setItem(COCKTAIL_STORAGE_KEYS.FILTER_VALUE, payload.value ?? "");

      if (!this.initializedDict.filter) {
        this.initializedDict.filter = true;
        return;
      } else {
        this.filterChange.emit(payload);
      }
    });

    effect(() => {
      localStorage.setItem(
        COCKTAIL_STORAGE_KEYS.FILTER_FIELD,
        this.filterField() ?? ""
      );
    });

    effect(() => {
      const newValue = this.favouriteValue();

      if (!this.initializedDict.favourite) {
        this.initializedDict.favourite = true;
        return;
      } else {
        this.favouriteOnlyToggle.emit(newValue);
      }
    });
  }

  ngOnInit(): void {
    untracked(() => {
      this.favouriteValue.set(this.favouriteValueInput());
      this.filterField.set(this.filterFieldInput());
      this.filterValueRaw.set(this.filterValueInput());
      this.filterValue.set(this.filterValueInput());
    });
  }

  protected onFilterValueChange(value: string): void {
    this.filterValueRaw.set(value);
  }

  protected onFilterFieldChange(value: SearchField): void {
    this.filterField.set(value);
    
    untracked(() => {
      this.filterValueRaw.set("");
    });
  }

  protected onFavouriteChange(): void {
    this.favouriteValue.update(v => !v);
    localStorage.setItem(
      COCKTAIL_STORAGE_KEYS.FAVOURITE_FIELD,
      this.favouriteValue().toString()
    );
  }
}
