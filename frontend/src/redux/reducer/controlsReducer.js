import { calendarToNumeric, currentCalDate, currentNumDate, numericToCalendar } from '../../utils/dateHelpers';
import {
  controlsHiddenWidth,
  defaultColorBy,
  defaultDateRange,
  defaultDistanceMeasure,
  defaultGeoResolution,
  defaultLayout,
  strainSymbol,
  twoColumnBreakpoint
} from '../../utils/globals';
import { calcBrowserDimensionsInitialState } from './browserDimensionsReducer';

const getInititalSidebarState = () => {
  return {
    sidebarOpen: window.innerWidth > controlsHiddenWidth,
    setDefault: false
  };
};

export const getDefaultControlsState = () => {
  const defaults = {
    distanceMeasure: defaultDistanceMeasure,
    layout: defaultLayout,
    geoResolution: defaultGeoResolution,
    filters: {},
    filtersInFooter: [],
    colorBy: defaultColorBy,
    selectedBranchLabel: 'none',
    tipLabelKey: strainSymbol,
    showTransmissionLines: true
  };

  const initialSidebarState = getInititalSidebarState();
  if (initialSidebarState.setDefault) {
    defaults.sidebarOpen = initialSidebarState.sidebarOpen;
  }

  const dateMin = numericToCalendar(currentNumDate() - defaultDateRange);
  const dateMax = currentCalDate();
  const dateMinNumeric = calendarToNumeric(dateMin);
  const dateMaxNumeric = calendarToNumeric(dateMax);

  return {
    defaults,
    available: undefined,
    canTogglePanelLayout: true,
    temporalConfidence: { exists: false, display: false, on: false },
    layout: defaults.layout,
    scatterVariables: {},
    distanceMeasure: defaults.distanceMeasure,
    dateMin,
    dateMinNumeric,
    dateMax,
    dateMaxNumeric,
    absoluteDateMin: dateMin,
    absoluteDateMinNumeric: dateMinNumeric,
    absoluteDateMax: dateMax,
    absoluteDateMaxNumeric: dateMaxNumeric,
    colorBy: defaults.colorBy,
    colorByConfidence: false,
    colorScale: undefined,
    explodeAttr: undefined,
    selectedBranchLabel: 'none',
    showAllBranchLabels: false,
    selectedNode: null,
    canRenderBranchLabels: true,
    analysisSlider: false,
    geoResolution: defaults.geoResolution,
    filters: defaults.filters,
    filtersInFooter: defaults.filtersInFooter,
    modal: null,
    quickdraw: false,
    mapAnimationDurationInMilliseconds: 30000,
    mapAnimationStartDate: null,
    mapAnimationCumulative: false,
    mapAnimationShouldLoop: false,
    animationPlayPauseButton: 'Play',
    panelsAvailable: [],
    panelsToDisplay: [],
    panelLayout: calcBrowserDimensionsInitialState().width > twoColumnBreakpoint ? 'grid' : 'full',
    tipLabelKey: defaults.tipLabelKey,
    showTreeToo: false,
    showTangle: false,
    zoomMin: undefined,
    zoomMax: undefined,
    branchLengthsToDisplay: 'divAndDate',
    sidebarOpen: initialSidebarState.sidebarOpen,
    treeLegendOpen: undefined,
    mapLegendOpen: undefined,
    showOnlyPanels: false,
    showTransmissionLines: true,
    normalizeFrequencies: true,
    measurementsCollectionKey: undefined,
    measurementsGroupBy: undefined,
    measurementsDisplay: undefined,
    measurementsShowOverallMean: undefined,
    measurementsShowThreshold: undefined,
    measurementsFilters: {}
  };
};
