import { useDispatch, useSelector } from 'react-redux';
import AuspiceMap from '@khaitd0340/auspice/src/components/map/map';
import { useTranslation } from 'react-i18next';
import React from 'react';

const MapSection1 = () => {
  const { t } = useTranslation();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const auspiceMapProps = {
    width: 600,
    height: 600,
    justGotNewDatasetRenderNewMap: false,
    legend: true,
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
    narrativeMode: state.narrative?.display,
    pieChart:
      !state.controls?.colorScale?.continuous && state.controls?.geoResolution !== state.controls?.colorScale?.colorBy,
    legendValues: state.controls?.colorScale?.legendValues,
    showTransmissionLines: state.controls?.showTransmissionLines,
    showOnlyPanels: state.controls?.showOnlyPanels,
    colorings: state.metadata?.colorings,
    colorScale: state.controls.colorScale,
    legenOpen: state.controls?.legenOpen || false,
    t,
    dispatch
  };
  return (
    <>
      <AuspiceMap {...auspiceMapProps} />
    </>
  );
};

export default MapSection1;
