import { ControlsContainer } from '@khaitd0340/auspice/src/components/controls/styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import ColorBySection from './ColorBySection';
import { Dispatch } from 'redux';
import FilterDataSection from './FilterDataSection';
import ChooseLayoutSection from './ChoooseLayout';
import ChooseMetricSection from './ChooseMetric';
import ChooseBranchLabelSection from './ChooseBranchLabel';
import ChooseTipLabelSection from './ChooseTipLabel';
import GeoSolutionSection from './GeoSolution';
import ChooseDataset from './ChooseDataset';

export interface PropsTypeControls {
  state: RootState;
  dispatch: Dispatch;
}

const Controls = () => {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const props = {
    state,
    dispatch
  };

  return (
    <ControlsContainer>
      <ChooseDataset />
      <ColorBySection {...props} />
      <FilterDataSection {...props} />
      <span style={{ paddingTop: '10px' }} />
      <ChooseLayoutSection {...props} />
      <ChooseMetricSection {...props} />
      <ChooseBranchLabelSection {...props} />
      <ChooseTipLabelSection {...props} />
      <GeoSolutionSection {...props} />
    </ControlsContainer>
  );
};

export default Controls;
