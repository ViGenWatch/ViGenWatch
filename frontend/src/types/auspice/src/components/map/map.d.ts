declare module '@khaitd0340/auspice/src/components/map/map' {
  import { AuspiceMetadata, AuspiceTreeNode } from 'auspice';
  import { FC } from 'react';
  import { Dispatch } from 'redux';
  import { TFunction } from 'i18next';

  export interface AuspiceMapProps {
    width?: number;
    height?: number;
    justGotNewDatasetRenderNewMap?: boolean;
    legend?: boolean;
    branchLengthsToDisplay?: string;
    absoluteDateMin?: Date;
    absoluteDateMax?: Date;
    treeVersion?: number;
    treeLoaded?: boolean;
    nodes?: AuspiceTreeNode[];
    nodeColors?: string[];
    visibility?: number[];
    visibilityVersion?: number;
    metadata?: AuspiceMetadata;
    colorScaleVersion?: number;
    geoResolution?: string;
    mapTriplicate?: any;
    dateMinNumeric?: number;
    dateMaxNumeric?: number;
    panelLayout?: string;
    colorBy?: string;
    narrativeMode?: boolean;
    pieChart?: boolean;
    legendValues?: Record<string, any>;
    showTransmissionLines?: boolean;
    showOnlyPanels?: boolean;
    t: TFunction;
    dispatch: Dispatch;
  }

  const Component: FC<AuspiceMapProps>;
  export default Component;
}
