declare module '@khaitd0340/auspice/src/components/controls/choose-branch-labelling' {
  import { FC } from 'react';
  import { TFunction } from 'i18next';
  import { Dispatch } from 'redux';

  export interface ChooseBranchLabelProps {
    selected?: string;
    showAll?: boolean;
    available?: string[];
    canRenderBranchLabels?: boolean;
    t: TFunction;
    dispatch: Dispatch;
  }

  const Component: FC<ChooseBranchLabelProps>;
  export default Component;
}
