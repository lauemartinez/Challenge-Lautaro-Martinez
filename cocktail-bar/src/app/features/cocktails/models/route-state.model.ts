export interface RouteState {
  scrollX: number;
  scrollY: number;
}

export type AppNavigationState = Record<string, RouteState>;
