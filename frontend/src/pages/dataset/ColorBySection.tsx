import { ControlHeader } from '@khaitd0340/auspice/src/components/controls/controlHeader';
import { useTranslation } from 'react-i18next';
import ColorBy, { ColorByInfo } from '@khaitd0340/auspice/src/components/controls/color-by';
import { PropsTypeControls } from './Controls';

const ColorBySection: React.FC<PropsTypeControls> = ({ state, dispatch }) => {
  const { t } = useTranslation();
  const props = {
    colorBy: state.controls?.colorBy,
    colorings: state.metadata?.colorings,
    genomeMap: state.entropy?.genomeMap,
    dispatch
  };
  return (
    <>
      <ControlHeader title={t('sidebar:Color By')} tooltip={ColorByInfo} />
      <ColorBy {...props} />
    </>
  );
};

export default ColorBySection;
