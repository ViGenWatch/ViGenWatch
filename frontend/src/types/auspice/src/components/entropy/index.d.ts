declare module '@khaitd0340/auspice/src/components/entropy' {
  import { FC } from 'react';
  import { TFunction } from 'i18next';
  import { Dispatch } from 'redux';

  export interface EntropyProps {
    width?: number;
    height?: number;
    selectedCds?: any;
    selectedPositions?: any;
    bars?: any[];
    genomeMap?: any;
    maxYVal?: number;
    showCounts?: any;
    loaded?: boolean;
    colorBy?: string;
    zoomMin?: any;
    zoomMax?: any;
    defaultColorBy?: string;
    panelLayout?: string;
    narrativeMode?: boolean;
    showOnlyPanels?: boolean;
    t: TFunction;
    dispatch: Dispatch;
  }

  const Component: FC<EntropyProps>;
  export default Component;
}
