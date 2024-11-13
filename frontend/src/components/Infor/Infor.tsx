import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useTranslation } from 'react-i18next';
import Infor from '@khaitd0340/auspice/src/components/info/info';
export interface InforSectionProps {
  width?: number;
}
const InforSection: React.FC<InforSectionProps> = (props: InforSectionProps) => {
  const { width } = props;
  const { t } = useTranslation();
  const state = useSelector((state: RootState) => state);
  const inforProps = {
    width,
    browserWidth: state.browserDimensions?.browserDimensions?.width,
    animationPlayPauseButton: state.controls?.animationPlayPauseButton,
    metadata: state.metadata,
    nodes: state.tree?.nodes,
    branchLengthsToDisplay: state.controls?.branchLengthsToDisplay,
    visibility: state.tree?.visibility,
    t
  };
  return (
    <>
      <Infor {...inforProps} />
    </>
  );
};

export default InforSection;
