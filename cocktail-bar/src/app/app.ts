import { Component, inject, signal } from "@angular/core";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { filter } from "rxjs";

@Component({
  selector: "app-root",
  imports: [RouterOutlet],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App {
  protected readonly title = signal("cocktail-bar");
  private readonly router = inject(Router);
  protected isHome = false;

  constructor() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        this.isHome = e.urlAfterRedirects === "/cocktails/home";
      });
  }
}
