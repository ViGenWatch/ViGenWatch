import { getDefaultControlsState } from '../redux/reducer/controlsReducer';
import { calcNodeColor } from '../utils/colorHelpers';
import { calcColorScale, createVisibleLegendValues } from '../utils/colorScale';
import { calendarToNumeric, numericToCalendar } from '../utils/dateHelpers';
import { defaultDateRange, reallySmallNumber } from '../utils/globals';
import { calcTotalTipsInTree, countTraitsAcrossTree, gatherTraitNames } from '../utils/treeCountHelper';
import { getTraiFromNode } from '../utils/treeMisHelpers';
import { calculateVisiblityAndBranchThickness } from '../utils/treeVisibilityHelpers';
import { hasMultipleGridPanels } from './panelDisplay';
import { treeDataToState } from './preProcessingTreeJson';
import { applyInViewNodesToTree } from './tree';

const convertColoringsListToDict = (coloringsArr) =>
  coloringsArr.reduce((colorings, { key, ...rest }) => {
    colorings[key] = rest;
    return colorings;
  }, {});

export const getMinCalDateViaTree = (nodes, state) => {
  const minNumDate = getTraiFromNode(nodes[0], 'num_date');
  return minNumDate === undefined
    ? numericToCalendar(state.dateMaxNumeric - defaultDateRange)
    : numericToCalendar(minNumDate - 0.01);
};

export const getMaxCalDateViaTree = (nodes) => {
  let maxNumDate = reallySmallNumber;
  nodes.forEach((node) => {
    const numDate = getTraiFromNode(node, 'num_date');
    if (numDate !== undefined && numDate > maxNumDate) {
      maxNumDate = numDate;
    }
  });
  maxNumDate += 0.01;
  return numericToCalendar(maxNumDate);
};

const modifyControlsStateViaTree = (state, tree) => {
  state.dateMin = getMinCalDateViaTree(tree.nodes, state);
  state.dateMax = getMaxCalDateViaTree(tree.nodes);
  state.dateMinNumeric = calendarToNumeric(state.dateMin);
  state.dateMaxNumeric = calendarToNumeric(state.dateMax);
  state.absoluteDateMin = state.dateMin;
  state.absoluteDateMax = state.dateMax;
  state.absoluteDateMinNumeric = calendarToNumeric(state.absoluteDateMin);
  state.absoluteDateMaxNumeric = calendarToNumeric(state.absoluteDateMax);

  // let [aaMuts, nucMuts] = [false, false];
  let num_date_confidence = false;

  const examineNodes = function examineNOdes(nodes) {
    nodes.forEach((node) => {
      // if (node.branch_attrs && node.branch_attrs.mutations) {
      //   const keys = Object.keys(node.branch_attrs.mutations);
      //   if (keys.length > 1 || (keys.length == 1 && keys[0] !== 'nuc')) aaMuts = true;
      //   if (keys.includes('nuc')) nucMuts = true;
      // }

      if (!num_date_confidence && getTraiFromNode(node, 'num_date', { confidence: true })) {
        num_date_confidence = true;
      }
    });
  };

  examineNodes(tree.nodes);

  const numDateAtRoot = getTraiFromNode(tree.nodes[0], 'num_date') !== undefined;
  const divAtRoot = getTraiFromNode(tree.nodes[0]) !== undefined;

  state.branchLengthsToDisplay = numDateAtRoot && divAtRoot ? 'divAndDate' : numDateAtRoot ? 'dateOnly' : 'divOnly';

  state.distanceMeasure = (() => {
    switch (state.branchLengthsToDisplay) {
      case 'divOnly':
        return 'div';
      case 'dateOnly':
        return 'num_date';
      default:
        return state.distanceMeasure;
    }
  })();

  if (tree.availableBranchLabels.indexOf('clade') !== -1) {
    state.defaults.selectedBranchLabel = 'clade';
    state.selectedBranchLabel = 'clade';
  }

  state.temporalConfidence = {
    exists: num_date_confidence,
    display: num_date_confidence,
    on: false
  };
  return state;
};

const modifyStateViaMetadata = (state, metadata) => {
  if (metadata.analysisSlider) {
    state['analysisSlider'] = { key: metadata.analysisSlider, valid: false };
  }

  if (metadata.filters) {
    state.filtersInFooter = [...metadata.filters];
  } else {
    console.warn('json did not include any filters');
    state.filtersInFooter = [];
  }

  if (metadata.displayDefaults) {
    const keysToCheckFor = [
      'geoResolution',
      'colorBy',
      'distanceMeasure',
      'layout',
      'mapTriplicate',
      'selectedBranchLabel',
      'tipLabelKey',
      'sidebar',
      'showTransmissionLines',
      'normalizeFrequencies'
    ];

    const expectedTypes = [
      'string',
      'string',
      'string',
      'string',
      'boolean',
      'string',
      'string',
      'string',
      'boolean',
      'boolean'
    ];

    for (const key of keysToCheckFor) {
      if (Object.hasOwnProperty.call(metadata.displayDefaults, key)) {
        const value = metadata.displayDefaults[key];
        const expectedType = expectedTypes[keysToCheckFor.indexOf(key)];
        if (typeof value === expectedType) {
          if (key === 'sidebar') {
            if (value === 'open') {
              state.defaults.sidebarOpen = true;
              state.sidebarOpen = true;
            } else if (value === 'closed') {
              state.defaults.sidebarOpen = false;
              state.sidebarOpen = false;
            } else {
              console.error("Skipping 'display_default' for sidebar as it's not 'open' or 'closed'");
            }
          } else {
            state[key] = value;
            state.defaults[key] = value;
          }
        } else {
          console.error("Skipping 'display_default' for ", key, 'as it is not of type ', expectedType);
        }
      }
    }
  } else {
    metadata.displayDefaults = {};
  }

  if (metadata.panels) {
    state.panelsAvailable = metadata.panels.slice();
    state.panelsToDisplay = metadata.panels.slice();
  } else {
    state.panelsAvailable = ['tree'];
    state.panelsToDisplay = ['tree'];
  }

  if (!metadata.geoResolutions || !metadata.geoResolutions.length) {
    state.panelsAvailable = state.panelsAvailable.filter((item) => item !== 'map');
    state.panelsToDisplay = state.panelsToDisplay.filter((item) => item !== 'map');
  }

  if (!metadata.colorings) metadata.colorings = {};

  if (metadata.displayDefaults && metadata.displayDefaults.panels && Array.isArray(metadata.displayDefaults.panels)) {
    metadata.displayDefaults.panels = metadata.displayDefaults.panels.filter((p) => state.panelsAvailable.includes(p));
    state.panelsToDisplay = state.panelsToDisplay.filter((p) => metadata.displayDefaults.panels.includes(p));
    state.defaults.panels = metadata.displayDefaults.panels;
  } else {
    state.defaults.panels = state.panelsAvailable.slice();
  }

  if (!hasMultipleGridPanels(state.panelsToDisplay)) {
    state.panelLayout = 'full';
    state.canTogglePanelLayout = false;
  }
  return state;
};

const createMetadataStateFromJson = (dataset) => {
  const metadata = {};
  if (dataset.meta.colorings) {
    metadata.colorings = convertColoringsListToDict(dataset.meta.colorings);
  }

  metadata.title = dataset.meta.title;
  metadata.updated = dataset.meta.updated;
  if (dataset.meta.description) {
    metadata.description = dataset.meta.description;
  }
  if (dataset.version) {
    metadata.version = dataset.version;
  }
  if (dataset.meta.maintainers) {
    metadata.maintainers = dataset.meta.maintainers;
  }
  if (dataset.meta.build_url) {
    metadata.build_url = dataset.meta.build_url;
  }
  if (dataset.meta.data_provenance) {
    metadata.dataProvenance = dataset.meta.data_provenance;
  }
  if (dataset.meta.filters) {
    metadata.filters = dataset.meta.filters;
  }
  if (dataset.meta.panels) {
    metadata.panels = dataset.meta.panels;
  }
  if (dataset.root_sequence) {
    metadata.root_sequence = dataset.root_sequence;
  }

  if (dataset.meta.display_defaults) {
    metadata.displayDefaults = {};
    const jsonKeyToAuspiceKey = {
      color_by: 'colorBy',
      geo_resolution: 'geoResolution',
      distance_measure: 'distanceMeasure',
      branch_label: 'selectedBranchLabel',
      tip_label: 'tipLabelKey',
      map_triplicate: 'mapTriplicate',
      layout: 'layout',
      language: 'language',
      sidebar: 'sidebar',
      panels: 'panels',
      transmission_lines: 'showTransmissionLines'
    };

    metadata.displayDefaults = Object.entries(jsonKeyToAuspiceKey).reduce((displayDefaults, [jsonKey, auspiceKey]) => {
      if (jsonKey in dataset.meta.display_defaults) {
        displayDefaults[auspiceKey] = dataset.meta.display_defaults[jsonKey];
      }
      return displayDefaults;
    }, {});
  }

  if (dataset.meta.geo_resolutions) {
    metadata.geoResolutions = dataset.meta.geo_resolutions;
  }

  metadata.loaded = true;
  return metadata;
};

const modifyTreeStateVisAndBranchThickness = (oldState, controlsState) => {
  let newIdxRoot = oldState.idxOfInViewRootNode;
  oldState.selectedClade = undefined;
  newIdxRoot = applyInViewNodesToTree(0, oldState);
  const visAndThicknessData = calculateVisiblityAndBranchThickness(oldState, controlsState, {
    dateMinNumeric: controlsState.dateMinNumeric,
    dateMaxNumeric: controlsState.dateMaxNumeric
  });

  const newState = Object.assign({}, oldState, visAndThicknessData);
  newState.idxOfInViewRootNode = newIdxRoot;
  return newState;
};

export const preProcessingDataset = (dataset, treeName) => {
  let tree, metadata, controls;
  metadata = createMetadataStateFromJson(dataset);
  tree = treeDataToState(dataset.tree);
  tree.debug = 'LEFT';
  tree.name = treeName;
  metadata.mainTreeNumTips = calcTotalTipsInTree(tree.nodes);
  controls = getDefaultControlsState();
  controls = modifyControlsStateViaTree(controls, tree);
  controls = modifyStateViaMetadata(controls, metadata);
  const stateCountAttrs = gatherTraitNames(tree.nodes, metadata.colorings);
  tree.totalStateCounts = countTraitsAcrossTree(tree.nodes, stateCountAttrs, false, true);
  if (dataset) {
    const colorScale = calcColorScale(controls.colorBy, controls, tree, metadata);
    const nodeColors = calcNodeColor(tree, colorScale);
    controls.colorScale = colorScale;
    tree.nodeColorsVersion = colorScale.version;
    tree.nodeColors = nodeColors;
    controls.colorByConfidence = false;
  }
  tree = modifyTreeStateVisAndBranchThickness(tree, controls);

  controls.colorScale.visibleLegendValues = createVisibleLegendValues({
    colorBy: controls.colorBy,
    scaleType: controls.colorScale.scaleType,
    legendValues: controls.colorScale.legendValues,
    treeNodes: tree.nodes,
    visibility: tree.visibility
  });

  return {
    tree,
    metadata,
    controls
  };
};
