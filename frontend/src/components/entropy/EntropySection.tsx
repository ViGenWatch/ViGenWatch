import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Entropy from '@khaitd0340/auspice/src/components/entropy';
import { useTranslation } from 'react-i18next';
export interface EntropySectionProps {
  width?: number;
  height?: number;
}
const EntropySection: React.FC<EntropySectionProps> = (props: EntropySectionProps) => {
  const { width, height } = props;
  const { t } = useTranslation();
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const entropyProps = {
    width,
    height,
    selectedCds: state.entropy?.selectedCds,
    selectedPositions: state.entropy?.selectedPositions,
    bars: state.entropy?.bars,
    genomeMap: state.entropy?.genomeMap,
    maxYVal: state.entropy?.maxYVal,
    showCounts: state.entropy?.showCounts,
    loaded: state.entropy?.loaded,
    colorBy: state.controls?.colorBy,
    /**
     * Note that zoomMin & zoomMax only represent the state when changed by a URL
     * i.e. on dataset load or narrative page change. As such, they fall out-of-sync
     * as soon as any user-zooming is performed.
     */
    zoomMin: state.controls?.zoomMin,
    zoomMax: state.controls?.zoomMax,
    defaultColorBy: state.controls?.defaults?.colorBy,
    panelLayout: state.controls?.panelLayout,
    narrativeMode: state.narrative.display,
    showOnlyPanels: state.controls?.showOnlyPanels,
    t,
    dispatch
  };
  return (
    <>
      <Entropy {...entropyProps} />
    </>
  );
};

export default EntropySection;
