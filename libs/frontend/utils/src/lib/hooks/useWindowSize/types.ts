export interface ScreenSizeState {
  width: number;
  height: number;
}

export type UseWindowsSizeHook = () => ScreenSizeState;
