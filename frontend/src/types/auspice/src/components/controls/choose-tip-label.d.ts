declare module '@khaitd0340/auspice/src/components/controls/choose-tip-label' {
  import { FC } from 'react';
  import { TFunction } from 'i18next';
  import { Dispatch } from 'redux';

  type TipLabelOption = {
    value: string;
    label: string;
  };

  type CollectAvailableTipLabelOptions = (
    nodeAttrKeys?: string,
    colorings?: { key?: string; title?: string; type?: string; scale?: string[][] }[]
  ) => TipLabelOption[];

  export const collectAvailableTipLabelOptions: CollectAvailableTipLabelOptions;

  export interface ChooseTipLabelProps {
    selected: typeof strainSymbol;
    options: TipLabelOption[];
    t: TFunction;
    dispatch: Dispatch;
  }

  const Component: FC<ChooseTipLabelProps>;
  export default Component;
}
