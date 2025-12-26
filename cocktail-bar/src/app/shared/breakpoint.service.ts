import { Injectable, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class BreakpointService {
  private breakpointObserver = inject(BreakpointObserver);

  readonly isMobile = toSignal(
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(map(r => r.matches)),
    { initialValue: false }
  );

  readonly isTablet = toSignal(
    this.breakpointObserver
      .observe([Breakpoints.Tablet])
      .pipe(map(r => r.matches)),
    { initialValue: false }
  );

  readonly isDesktop = toSignal(
    this.breakpointObserver
      .observe([Breakpoints.Web])
      .pipe(map(r => r.matches)),
    { initialValue: true }
  );
}
