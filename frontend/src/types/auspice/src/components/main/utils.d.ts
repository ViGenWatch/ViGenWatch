declare module '@khaitd0340/auspice/src/components/main/utils' {
  type CalcStylesOutput = {
    overlayStyles: {
      position: string;
      top: number;
      bottom: number;
      right: number;
      display: string;
      width: number;
      height: number;
      left: number;
      opacity: number;
      visibility: string;
      zIndex: number;
      backgroundColor: string;
      cursor: string;
      overflow: string;
      transition: string;
    };
    availableWidth: number;
    availableHeight: number;
    sidebarWidth: number;
  };

  type CalcStyles = (
    browserDimensions: { width?: number; height?: number; docHeight?: number },
    displayNarrative: boolean,
    sidebarOpen: boolean,
    mobileDisplay: boolean
  ) => CalcStylesOutput;

  type CalcPanelDimsOutput = {
    full: { width?: number; height?: number };
    grid: { width?: number; height?: number };
    chartEntropy: { width?: number; height?: number };
    chartFrequencies: { width?: number; height?: number };
  };

  type CalcPanelDims = (
    panelsToDisplay?: string[],
    displayNarrative: boolean,
    availableWidth: number,
    availableHeight: number
  ) => CalcPanelDimsOutput;

  export const calcPanelDims: CalcPanelDims;

  export const calcStyles: CalcStyles;
}
