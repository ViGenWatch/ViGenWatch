declare module '@khaitd0340/auspice/src/components/controls/choose-layout' {
  import { FC } from 'react';
  import { Layout } from 'auspice';
  import { TFunction } from 'i18next';
  import { Dispatch } from 'redux';

  export interface ChooseLayoutProps {
    layout?: Layout;
    scatterVariables?: any;
    colorings?: { key?: string; title?: string; type?: string; scale?: string[][] }[];
    colorBy?: string;
    showTreeToo?: boolean;
    branchLengthsToDisplay?: string;
    t: TFunction;
    dispatch: Dispatch;
  }
  const Component: FC<ChooseLayoutProps>;
  export default Component;
}
