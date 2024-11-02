declare module '@khaitd0340/auspice/src/components/controls/date-range-inputs' {
  import { FC } from 'react';
  import { Dispatch } from 'redux';

  export const DateRangeInfo: FC;

  export interface DateRangeInputProps {
    branchLengthsToDisplay?: string;
    dateMin?: Date;
    dateMinNumeric?: number;
    dateMax?: string;
    dateMaxNumeric?: number;
    absoluteDateMin?: Date;
    absoluteDateMinNumeric?: number;
    absoluteDateMax?: string;
    absoluteDateMaxNumeric?: number;
    dispatch: Dispatch;
  }

  const DateRangeInputs: FC<DateRangeInputProps>;
  export default DateRangeInputs;
}
