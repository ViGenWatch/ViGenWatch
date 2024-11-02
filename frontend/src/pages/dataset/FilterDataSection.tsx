import { useTranslation } from 'react-i18next';
import { PropsTypeControls } from './Controls';
import FilterData, { FilterInfo } from '@khaitd0340/auspice/src/components/controls/filter';
import { ControlHeader } from '@khaitd0340/auspice/src/components/controls/controlHeader';

const FilterDataSection: React.FC<PropsTypeControls> = ({ state, dispatch }) => {
  const { t } = useTranslation();
  const panelsToDisplay = state.controls?.panelsToDisplay;
  const props = {
    measurementsOn: panelsToDisplay?.includes('measurements'),
    activeFilters: state.controls?.filters,
    colorings: state.metadata?.colorings,
    totalStateCounts: state.tree?.totalStateCounts,
    canFilterByGenotype: !!state.entropy?.genomeMap,
    nodes: state.tree?.nodes,
    nodesSecondTree: state.treeToo?.nodes,
    totalStateCountsSecondTree: state.treeToo?.totalStateCounts,
    measurementsFieldsMap: state.measurements?.collectionToDisplay.fields,
    measurementsFiltersMap: state.measurements?.collectionToDisplay.filters,
    measurementsFilters: state.controls?.measurementsFilters,
    dispatch
  };
  return (
    <>
      <ControlHeader title={t('sidebar:Filter Data')} tooltip={FilterInfo} />
      <FilterData {...props} />
    </>
  );
};

export default FilterDataSection;
