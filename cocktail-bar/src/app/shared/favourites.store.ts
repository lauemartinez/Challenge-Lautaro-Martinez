import { Injectable, signal, effect } from '@angular/core';

const STORAGE_KEY = 'cocktail-favourites';

@Injectable({ providedIn: 'root' })
export class FavouritesStore {
  private readonly favourites = signal<Set<string>>(this.load());

  readonly favouriteIds = this.favourites.asReadonly();

  constructor() {
    effect(() => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([...this.favourites()])
      );
    });

    window.addEventListener('storage', (event) => {
      if (event.key === STORAGE_KEY && event.newValue) {
        this.favourites.set(new Set(JSON.parse(event.newValue)));
      }
    });
  }

  toggleFavourite(id: string): void {
    const favourites = new Set(this.favourites());

    if (favourites.has(id)) {
      favourites.delete(id);
    } else {
      favourites.add(id);
    }

    this.favourites.set(favourites);
  }

  isFavourite(id: string): boolean {
    return this.favourites().has(id);
  }

  private load(): Set<string> {
    try {
      return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]'));
    } catch {
      return new Set();
    }
  }
}
