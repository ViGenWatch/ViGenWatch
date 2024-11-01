declare module '@khaitd0340/auspice/src/components/tree/tree' {
  import { FC } from 'react';
  import { Dispatch } from 'redux';
  import { AuspiceTreeState, Layout } from 'auspice';
  import { TFunction } from 'i18next';

  export interface AuspiceTreeProps {
    width: string;
    height: string;
    tree?: AuspiceTreeState;
    treeToo?: AuspiceTreeState;
    selectedNode?: any;
    dateMinNumeric?: number;
    dateMaxNumeric?: number;
    filters?: Record<string, string[]>;
    quickdraw?: boolean;
    colorBy?: string;
    colorByConfidence?: boolean;
    layout?: Layout;
    scatterVariables?: any;
    temporalConfidence?: { exists?: boolean; display?: boolean; on?: boolean };
    distanceMeasure?: string;
    explodeAttr?: any;
    focus?: boolean;
    colorScale?: {
      scale?: Record<string, any>;
      continuous?: boolean;
      colorBy?: string;
      version?: number;
      legendValues?: Record<string, any>;
      legendBounds?: any;
      genotype?: any;
    };
    colorings?: { key?: string; title?: string; type?: string; scale?: string[][] }[];
    genomeMap?: any;
    showTreeToo?: boolean;
    showTangle?: boolean;
    panelsToDisplay?: string[];
    selectedBranchLabel?: string;
    canRenderBranchLabels?: boolean;
    showAllBranchLabels?: boolean;
    tipLabelKey?: typeof strainSymbol;
    narrativeMode?: any;
    animationPlayPauseButton?: string;
    showOnlyPanels?: boolean;
    t: TFunction;
    dispatch: Dispatch;
  }

  const Component: FC<AuspiceTreeProps>;
  export default Component;
}
