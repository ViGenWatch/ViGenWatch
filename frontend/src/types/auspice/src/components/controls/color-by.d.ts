declare module '@khaitd0340/auspice/src/components/controls/color-by' {
  import type { FC } from 'react';

  export const ColorByInfo: FC;

  export interface ColorByProps {
    colorBy?: string;
    colorings?: { key?: string; title?: string; type?: string; scale?: string[][] }[];
    genomeMap?: any;
  }

  const Component: FC<ColorByProps>;
  export default Component;
}
