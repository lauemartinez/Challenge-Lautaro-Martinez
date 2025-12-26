import { effect, Injectable, signal } from "@angular/core";
import {
  AppNavigationState,
  RouteState,
} from "../features/cocktails/models/route-state.model";

const STORAGE_KEY = "nav-state";

@Injectable({ providedIn: "root" })
export class NavigationStore {
  private readonly state = signal<AppNavigationState>(this.loadFromStorage());

  constructor() {
    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state()));
    });
  }

  save(route: string, scrollX: number, scrollY: number): void {
    const value: RouteState = { scrollX, scrollY };

    this.state.update((s) => ({
      ...s,
      [route]: value,
    }));
  }

  get(route: string): RouteState | undefined {
    return this.state()[route];
  }

  private loadFromStorage(): AppNavigationState {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  }
}
