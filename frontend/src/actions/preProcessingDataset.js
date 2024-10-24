import { calcTotalTipsInTree } from '../utils/treeCountHelper';
import { treeDataToState } from './preProcessingTreeJson';

const convertColoringsListToDict = (coloringsArr) =>
  coloringsArr.reduce((colorings, { key, ...rest }) => {
    colorings[key] = rest;
    return colorings;
  }, {});

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

export const preProcessingDataset = (dataset, treeName) => {
  let tree, metadata;
  metadata = createMetadataStateFromJson(dataset);
  tree = treeDataToState(dataset.tree);
  tree.debug = 'LEFT';
  tree.name = treeName;
  metadata.mainTreeNumTips = calcTotalTipsInTree(tree.nodes);

  return {
    tree,
    metadata
  };
};
