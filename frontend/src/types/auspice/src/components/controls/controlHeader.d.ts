declare module '@khaitd0340/auspice/src/components/controls/controlHeader' {
  import type { FC, ReactNode } from 'react';
  import { TFunctionResult } from 'i18next';

  export interface ControlHeaderProps {
    title: TFunctionResult;
    tooltip: FC;
  }

  export const ControlHeader: FC<ControlHeaderProps>;
}
