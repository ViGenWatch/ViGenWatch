import { useTranslation } from 'react-i18next';
import { PropsTypeControls } from './Controls';
import ChooseMetric from '@khaitd0340/auspice/src/components/controls/choose-metric';

const ChooseMetricSection: React.FC<PropsTypeControls> = ({ state, dispatch }) => {
  const { t } = useTranslation();
  const props = {
    distanceMeasure: state.controls?.distanceMeasure,
    layout: state.controls?.layout,
    showTreeToo: state.controls?.showTreeToo,
    branchLengthsToDisplay: state.controls?.branchLengthsToDisplay,
    temporalConfidence: state.controls?.temporalConfidence,
    t,
    dispatch
  };
  return (
    <>
      <ChooseMetric {...props} />
    </>
  );
};

export default ChooseMetricSection;
