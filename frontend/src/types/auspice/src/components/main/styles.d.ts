declare module '@khaitd0340/auspice/src/components/main/styles' {
  import type { FC, ReactNode } from 'react';

  export interface SiderbarContainerProps {
    width: number;
    height: number;
    left: number;
    theme?: SidebarThemeType;
    children?: ReactNode;
  }

  export interface PanelsContainerProps {
    width: number;
    height: number;
    left: number;
    children?: ReactNode;
  }

  export interface SidebarThemeType {
    background: string;
    color: string;
    'font-family': string;
    sidebarBoxShadow: string;
    selectedColor: string;
    unselectedColor: string;
    alternateBackground: string;
  }

  export const SidebarContainer: FC<SiderbarContainerProps>;

  export const sidebarTheme: SidebarThemeType;

  export const PanelsContainer: FC<PanelsContainerProps>;
}
