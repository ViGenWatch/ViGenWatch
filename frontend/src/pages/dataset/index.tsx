import LayoutComponent from '../../components/layout';
import { useDispatch, useSelector } from 'react-redux';
// import AuspiceTree from '@khaitd0340/auspice/src/components/tree/tree';
import { useTranslation } from 'react-i18next';
import { RootState } from '../../redux/store';
import AuspiceTree from '@khaitd0340/auspice/src/components/tree/tree';
const DatasetPage = () => {
  const state = useSelector((state: RootState) => state);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const props = {
    width: '800px',
    height: '800px',
    tree: state.tree,
    treeToo: state.treeToo,
    selectedNode: state.controls?.selectedNode,
    dateMinNumeric: state.controls?.dateMinNumeric,
    dateMaxNumeric: state.controls?.dateMaxNumeric,
    filters: state.controls?.filters,
    quickdraw: state.controls?.quickdraw,
    colorBy: state.controls?.colorBy,
    colorByConfidence: state.controls?.colorByConfidence,
    layout: state.controls?.layout,
    scatterVariables: state.controls?.scatterVariables,
    temporalConfidence: state.controls?.temporalConfidence,
    distanceMeasure: state.controls?.distanceMeasure,
    explodeAttr: state.controls?.explodeAttr,
    focus: state.controls?.focus,
    colorScale: state.controls?.colorScale,
    colorings: state.metadata?.colorings,
    genomeMap: state.entropy?.genomeMap,
    showTreeToo: state.controls?.showTreeToo,
    showTangle: state.controls?.showTangle,
    panelsToDisplay: state.controls?.panelsToDisplay,
    selectedBranchLabel: state.controls?.selectedBranchLabel,
    canRenderBranchLabels: state.controls?.canRenderBranchLabels,
    showAllBranchLabels: state.controls?.showAllBranchLabels,
    tipLabelKey: state.controls?.tipLabelKey,
    narrativeMode: state.narrative?.display,
    animationPlayPauseButton: state.controls?.animationPlayPauseButton,
    showOnlyPanels: state.controls?.showOnlyPanels,
    t,
    dispatch
  };

  return (
    <LayoutComponent>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%', overflow: 'hidden' }}>
        <AuspiceTree {...props} />
      </div>
    </LayoutComponent>
  );
};

export default DatasetPage;