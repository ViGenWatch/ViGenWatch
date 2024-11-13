import { ControlHeader } from '@khaitd0340/auspice/src/components/controls/controlHeader';
import { PropsTypeControls } from './Controls';
import { useTranslation } from 'react-i18next';
import DateRangeInputs, { DateRangeInfo } from '@khaitd0340/auspice/src/components/controls/date-range-inputs';
import AnimationControls from '@khaitd0340/auspice/src/components/controls/animation-controls';

const DateRangeAnimate: React.FC<PropsTypeControls> = ({ state, dispatch }) => {
  const { t } = useTranslation();
  const props = {
    branchLengthsToDisplay: state.controls?.branchLengthsToDisplay,
    dateMin: state.controls?.dateMin,
    dateMax: state.controls?.dateMax,
    dateMinNumeric: state.controls?.dateMinNumeric,
    dateMaxNumeric: state.controls?.dateMaxNumeric,
    absoluteDateMin: state.controls?.absoluteDateMin,
    absoluteDateMax: state.controls?.absoluteDateMax,
    absoluteDateMinNumeric: state.controls?.absoluteDateMinNumeric,
    absoluteDateMaxNumeric: state.controls?.absoluteDateMaxNumeric,
    dispatch
  };

  const animationControlsProps = {
    absoluteDateMin: state.controls?.absoluteDateMin,
    absoluteDateMax: state.controls?.absoluteDateMax,
    animationPlayPauseButton: state.controls?.animationPlayPauseButton,
    branchLengthsToDisplay: state.controls?.branchLengthsToDisplay,
    t,
    dispatch
  };
  return (
    <>
      <ControlHeader title={t('sidebar:Color By')} tooltip={DateRangeInfo} />
      <DateRangeInputs {...props} />
      <AnimationControls {...animationControlsProps} />
    </>
  );
};

export default DateRangeAnimate;
