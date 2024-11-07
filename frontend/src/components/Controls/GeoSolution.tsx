import { ControlHeader } from '@khaitd0340/auspice/src/components/controls/controlHeader';
import { useTranslation } from 'react-i18next';
import GeoResolution from '@khaitd0340/auspice/src/components/controls/geo-resolution';
import { PropsTypeControls } from './Controls';
import { MapInfo } from '@khaitd0340/auspice/src/components/controls/miscInfoText';

const GeoSolutionSection: React.FC<PropsTypeControls> = ({ state, dispatch }) => {
  const { t } = useTranslation();
  const props = {
    metadata: state.metadata,
    geoResolution: state.controls?.geoResolution,
    t,
    dispatch
  };
  return (
    <>
      <ControlHeader title={t('sidebar:Map')} tooltip={MapInfo} />
      <GeoResolution {...props} />
    </>
  );
};

export default GeoSolutionSection;
