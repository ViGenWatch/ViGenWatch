declare module '@khaitd0340/auspice/src/components/controls/choose-metric' {
  import { FC } from 'react';
  import { Layout } from 'auspice';
  import { TFunction } from 'i18next';
  import { Dispatch } from 'redux';

  export interface ChooseMetricProps {
    distanceMeasure?: string;
    layout?: Layout;
    showTreeToo?: boolean;
    branchLengthsToDisplay?: string;
    temporalConfidence?: { exists?: boolean; display?: boolean; on?: boolean };
    t: TFunction;
    dispatch: Dispatch;
  }

  const Component: FC<ChooseMetricProps>;
  export default Component;
}
