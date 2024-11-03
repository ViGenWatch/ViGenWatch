import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Tree from '@khaitd0340/auspice/src/components/tree/tree';

export interface TreeSectionProps {
  width?: number;
  height?: number;
}
const TreeSection: React.FC<TreeSectionProps> = (props: TreeSectionProps) => {
  const { width, height } = props;
  const { t } = useTranslation();
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const auspiceTreeProps = {
    width,
    height,
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
    legendOpen: state.controls?.legendOpen || false,
    t,
    dispatch
  };
  return (
    <>
      <Tree {...auspiceTreeProps} />
    </>
  );
};

export default TreeSection;
