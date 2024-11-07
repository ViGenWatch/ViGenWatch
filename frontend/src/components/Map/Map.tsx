import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import AuspiceMap from '@khaitd0340/auspice/src/components/map/map';
import { useTranslation } from 'react-i18next';
export interface MapSectionProps {
  width?: number;
  height?: number;
  justGotNewDatasetRenderNewMap?: boolean;
  legend?: boolean;
}
const MapSection: React.FC<MapSectionProps> = (props: MapSectionProps) => {
  const { width, height, justGotNewDatasetRenderNewMap, legend } = props;
  const { t } = useTranslation();
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const auspiceMapProps = {
    width,
    height,
    justGotNewDatasetRenderNewMap,
    legend,
    branchLengthsToDisplay: state.controls?.branchLengthsToDisplay,
    absoluteDateMin: state.controls?.absoluteDateMin,
    absoluteDateMax: state.controls?.absoluteDateMax,
    treeVersion: state.tree?.version,
    treeLoaded: state.tree?.loaded,
    nodes: state.tree?.nodes,
    nodeColors: state.tree?.nodeColors,
    visibility: state.tree?.visibility,
    visibilityVersion: state.tree?.visibilityVersion,
    metadata: state.metadata,
    colorScaleVersion: state.controls?.colorScale?.version,
    geoResolution: state.controls?.geoResolution,
    mapTriplicate: state.controls?.mapTriplicate,
    dateMinNumeric: state.controls?.dateMinNumeric,
    dateMaxNumeric: state.controls?.dateMaxNumeric,
    panelLayout: state.controls?.panelLayout,
    colorBy: state.controls?.colorScale?.colorBy,
    narrativeMode: state.narrative?.display as boolean,
    pieChart:
      !state.controls?.colorScale?.continuous && state.controls?.geoResolution !== state.controls?.colorScale?.colorBy,
    legendValues: state.controls?.colorScale?.legendValues,
    showTransmissionLines: state.controls?.showTransmissionLines,
    showOnlyPanels: state.controls?.showOnlyPanels,
    colorings: state.metadata?.colorings,
    colorScale: state.controls?.colorScale,
    legendOpen: state.controls?.legendOpen || false,
    t,
    dispatch
  };
  return (
    <>
      <AuspiceMap {...auspiceMapProps} />
    </>
  );
};

export default MapSection;
