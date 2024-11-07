import { useTranslation } from 'react-i18next';
import ChooseBranchLabel from '@khaitd0340/auspice/src/components/controls/choose-branch-labelling';
import { PropsTypeControls } from './Controls';

const ChooseBranchLabelSection: React.FC<PropsTypeControls> = ({ state, dispatch }) => {
  const { t } = useTranslation();
  const props = {
    selected: state.controls?.selectedBranchLabel,
    showAll: state.controls?.showAllBranchLabels,
    available: Array.from(
      new Set(state.tree?.availableBranchLabels).union(new Set(state.treeToo?.availableBranchLabels ?? []))
    ),
    canRenderBranchLabels: state.controls?.canRenderBranchLabels,
    t,
    dispatch
  };
  return (
    <>
      <ChooseBranchLabel {...props} />
    </>
  );
};

export default ChooseBranchLabelSection;
