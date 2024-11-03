import { ControlHeader } from '@khaitd0340/auspice/src/components/controls/controlHeader';
import { useTranslation } from 'react-i18next';
import ChooseLayout from '@khaitd0340/auspice/src/components/controls/choose-layout';
import { PropsTypeControls } from './Controls';
import { TreeInfo } from '@khaitd0340/auspice/src/components/controls/miscInfoText';

const ChooseLayoutSection: React.FC<PropsTypeControls> = ({ state, dispatch }) => {
  const { t } = useTranslation();
  const props = {
    layout: state.controls?.layout,
    scatterVariables: state.controls?.scatterVariables,
    colorings: state.metadata?.colorings,
    colorBy: state.controls?.colorBy,
    showTreeToo: state.controls?.showTreeToo,
    branchLengthsToDisplay: state.controls?.branchLengthsToDisplay,
    t,
    dispatch
  };
  return (
    <>
      <ControlHeader title={t('sidebar:Tree')} tooltip={TreeInfo} />
      <ChooseLayout {...props} />
    </>
  );
};

export default ChooseLayoutSection;
