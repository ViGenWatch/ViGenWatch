import { useTranslation } from 'react-i18next';
import ChooseTipLabel, {
  collectAvailableTipLabelOptions
} from '@khaitd0340/auspice/src/components/controls/choose-tip-label';
import { PropsTypeControls } from './Controls';

const ChooseTipLabelSection: React.FC<PropsTypeControls> = ({ state, dispatch }) => {
  const { t } = useTranslation();
  const props = {
    selected: state.controls?.tipLabelKey,
    options: collectAvailableTipLabelOptions(state.tree?.nodeAttrKeys, state.metadata?.colorings || []),
    t,
    dispatch
  };
  return (
    <>
      <ChooseTipLabel {...props} />
    </>
  );
};

export default ChooseTipLabelSection;
