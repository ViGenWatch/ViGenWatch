declare module '@khaitd0340/auspice/src/components/controls/animation-controls' {
  import { FC } from 'react';
  import { TFunction } from 'i18next';
  import { Dispatch } from 'redux';

  export interface AnimationControlsProps {
    absoluteDateMin?: Date;
    absoluteDateMax?: Date;
    animationPlayPauseButton?: string;
    branchLengthsToDisplay?: string;
    t: TFunction;
    dispatch: Dispatch;
  }

  const Component: FC<AnimationControlsProps>;
  export default Component;
}
