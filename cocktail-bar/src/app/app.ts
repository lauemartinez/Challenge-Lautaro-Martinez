import { Component, inject, signal } from "@angular/core";
import {
  NavigationEnd,
  NavigationStart,
  Router,
  RouterOutlet,
} from "@angular/router";
import { filter } from "rxjs";
import { NavigationStore } from "./shared/navigation.store";

@Component({
  selector: "app-root",
  imports: [RouterOutlet],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App {
  protected readonly title = signal("cocktail-bar");
  private readonly router = inject(Router);
  private readonly navigationStore = inject(NavigationStore);
  protected isHome = false;

  constructor() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationStart))
      .subscribe(() => {
        if (this.isHome) {
          this.navigationStore.save(this.router.url, window.scrollX, window.scrollY);
        }
      });

    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        const url = e.urlAfterRedirects;
        const state = this.navigationStore.get(url);
        this.isHome = url === "/cocktails/home";

        if (state && this.isHome) {
          setTimeout(() => {
            window.scrollTo(state.scrollX, state.scrollY);
          }, 50);
        }
      });
  }
}
