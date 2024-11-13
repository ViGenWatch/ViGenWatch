declare module '@khaitd0340/auspice/src/components/info/info' {
  import { AuspiceMetadata, AuspiceTreeNode } from 'auspice';
  import { FC } from 'react';
  import { TFunction } from 'i18next';

  export interface InforProps {
    width?: number;
    browserWidth?: number;
    animationPlayPauseButton?: string;
    metadata?: AuspiceMetadata;
    nodes?: AuspiceTreeNode[];
    branchLengthsToDisplay?: string;
    visibility?: number[];
    t: TFunction;
  }

  const Infor: FC<InforProps>;
  export default Infor;
}
