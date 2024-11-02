declare module '@khaitd0340/auspice/src/components/controls/filter' {
  import type { FC } from 'react';
  import { AuspiceTreeNode } from 'auspice';
  import { Dispatch } from 'redux';

  export interface FilterDataProps {
    measurementsOn?: boolean;
    filters?: Record<string, string[]>;
    colorings?: any;
    totalStateCounts?: Record<string, Map<string, number>>;
    canFilterByGenotype?: any;
    nodes?: AuspiceTreeNode[];
    nodesSecondTree?: AuspiceTreeNode[];
    totalStateCounts?: Record<string, Map<string, number>>;
    measurementsFieldsMap?: any;
    measurementsFiltersMap?: any;
    measurementsFilters?: {
      [key: string]: Map<string, { active: boolean }>;
    };
    dispatch: Dispatch;
  }

  const FilterData: FC<FilterDataProps>;
  export default FilterData;

  export const FilterInfo: FC;
}
