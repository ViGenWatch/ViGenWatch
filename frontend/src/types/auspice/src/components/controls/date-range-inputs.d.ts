declare module '@khaitd0340/auspice/src/components/controls/date-range-inputs' {
  import { FC } from 'react';
  import { Dispatch } from 'redux';

  export const DateRangeInfo: FC;

  export interface DateRangeInputProps {
    branchLengthsToDisplay?: string;
    dateMin?: Date;
    dateMinNumeric?: number;
    dateMax?: Date;
    dateMaxNumeric?: number;
    absoluteDateMin?: Date;
    absoluteDateMinNumeric?: number;
    absoluteDateMax?: Date;
    absoluteDateMaxNumeric?: number;
    dispatch: Dispatch;
  }

  const DateRangeInputs: FC<DateRangeInputProps>;
  export const DateRangeInfo: FC;
  export default DateRangeInputs;
}
