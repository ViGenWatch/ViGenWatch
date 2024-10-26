import { getExtravals, numDate } from './colorHelpers';
import { colors, dateRangeSize, isValueValid, NODE_VISIBLE } from './globals';
import { getTraiFromNode } from './treeMisHelpers';
import { scaleOrdinal, scaleLinear } from 'd3-scale';
import { interpolateHcl } from 'd3-interpolate';
import { countTraitsAcrossTree } from './treeCountHelper';
import { range as d3Range } from 'd3-array';

export const unknownColor = '#ADB1B3';

const _validateAnchorPoints = (providedScale, validator) => {
  if (!Array.isArray(providedScale)) return false;
  const scales = providedScale.filter(
    (item) =>
      Array.isArray(item) &&
      item.length === 2 &&
      validator(item[0]) &&
      typeof item[1] === 'string' &&
      item[1].match(/#[0-9A-Fa-f]{6}/)
  );
  if (scales.length < 2) return false;
  return scales;
};

function createLegendBounds(legendValues) {
  const valBetween = (x0, x1) => x0 + 0.5 * (x1 - x0);
  const len = legendValues.length;
  const legendBounds = {};
  legendBounds[legendValues[0]] = [-Infinity, valBetween(legendValues[0], legendValues[1])];
  for (let i = 1; i < len - 1; i++) {
    legendBounds[legendValues[i]] = [
      valBetween(legendValues[i - 1], legendValues[i]),
      valBetween(legendValues[i], legendValues[i + 1])
    ];
  }
  legendBounds[legendValues[len - 1]] = [valBetween(legendValues[len - 2], legendValues[len - 1]), Infinity];
  return legendBounds;
}

const createListOfColors = (n, range) => {
  const scale = scaleLinear().domain([0, n]).interpolate(interpolateHcl).range(range);
  return d3Range(0, n).map(scale);
};

export const sortedDomain = (domain, attr, stateCount) => {
  const sorted = Array.from(domain);
  if (attr === 'clade_membership') {
    sorted.sort();
  } else {
    sorted.sort((a, b) =>
      stateCount.get(a) === stateCount.get(b) ? (a < b ? -1 : 1) : stateCount.get(a) > stateCount.get(b) ? -1 : 1
    );
  }
  return sorted;
};

const getDiscreteValuesFromTree = (nodes, attr) => {
  const stateCount = countTraitsAcrossTree(nodes, [attr], false, false)[attr];
  const domain = sortedDomain(
    Array.from(stateCount.keys()).filter((x) => isValueValid(x)),
    attr,
    stateCount
  );
  return domain;
};

const createDiscreteScale = (domain, type) => {
  let colorList;
  if (type === 'ordinal' || type === 'categorical') {
    colorList = domain.length < colors.length ? colors[domain.length].slice() : colors[colors.length - 1].slice();
  }
  const scale = scaleOrdinal().domain(domain).range(colorList);
  return (val) => (val === undefined || domain.indexOf(val) === -1 ? unknownColor : scale(val));
};

const createTemporalScale = (colorBy, providedScale, t1nodes) => {
  let domain, range;
  const anchorPoints = _validateAnchorPoints(providedScale, (val) => numDate(val) !== undefined);
  if (anchorPoints) {
    domain = anchorPoints.map((pt) => numDate(pt[0]));
    range = anchorPoints.map((pt) => pt[1]);
  } else {
    let rootDate = numDate(getTraiFromNode(t1nodes[0], colorBy));
    let vals = t1nodes.filter((n) => !n.hasChildren).map((n) => numDate(getTraiFromNode(n, colorBy)));
    vals = vals.sort();
    domain = [rootDate];
    const n = dateRangeSize;
    const spaceBetween = parseInt(vals.length / (n - 1), 10);
    for (let i = 0; i < n - 1; i++) {
      domain.push(vals[spaceBetween * i]);
    }
    domain.push(vals[vals.length - 1]);
    domain = [...new Set(domain)];
    range = colors[domain.length];
  }
  const scaleFunc = scaleLinear().domain(domain).range(range);
  const legendValues = anchorPoints ? domain.slice() : domain.slice(1);
  if (Object.is(legendValues[0], -0)) legendValues[0] = 0;
  const colorScale = (val) => {
    const d = numDate(val);
    return d === undefined ? unknownColor : scaleFunc(d);
  };

  return {
    continuous: true,
    colorScale,
    legendBounds: createLegendBounds(legendValues),
    legendValues
  };
};

export const createNonContinuousScaleFromProvidedScaleMap = (colorBy, providedScale, t1nodes) => {
  if (!Array.isArray(providedScale)) {
    throw new Error(`${colorBy} has defined a scale which wasn't an array`);
  }
  const colorMap = new Map();
  for (const [name, colorHex] of providedScale) {
    if (colorMap.has(name)) {
      console.warn(`User provided color scale contained a duplicate entry for ${colorBy}→${name} which is ignored.`);
    } else {
      colorMap.set(name, colorHex);
    }
  }

  let domain = Array.from(colorMap).map((x) => x[0]);
  const extraVals = getExtravals(t1nodes, colorBy, domain);
  if (extraVals.length) {
    domain = domain.concat(extraVals);
    const extraColors = createListOfColors(extraVals.length, ['#BDC3C6', '#868992']);
    extraVals.forEach((val, idx) => {
      colorMap.set(val, extraColors[idx]);
    });
  }
  return {
    continuous: false,
    legendValues: domain,
    colorScale: (val) => colorMap.get(val) || unknownColor
  };
};

export const createVisibleLegendValues = ({ colorBy, scaleType, legendValues, treeNodes, visibility }) => {
  if (visibility) {
    if (scaleType === 'ordinal' || scaleType === 'categorical') {
      let legendValuesObserved = treeNodes
        .filter((n, i) => !n.hasChildren && visibility[i] === NODE_VISIBLE)
        .map((n) => getTraiFromNode(n, colorBy));
      legendValuesObserved = new Set(legendValuesObserved);
      const visibleLegendValues = legendValues.filter((v) => legendValuesObserved.has(v));
      return visibleLegendValues;
    }
  }
  return legendValues.slice();
};

export const calcColorScale = (colorBy, controls, tree, metadata) => {
  try {
    if (colorBy === 'none') {
      throw new Error("colorBy is 'none'. Falling back to a default, uninformative color scale.");
    }
    if (!tree.nodes) {
      throw new Error('calcColorScale called before tree is ready.');
    }
    const colorings = metadata.colorings;
    let continuous = false;
    let colorScale, legendValues, legendBounds, legendLabels, domain;
    const scaleType = colorings[colorBy].type;
    if (colorings && colorings[colorBy]) {
      if (scaleType === 'temporal' || colorBy === 'num_date') {
        ({ continuous, colorScale, legendBounds, legendValues } = createTemporalScale(
          colorBy,
          colorings[colorBy].scale,
          tree.nodes
        ));
      } else if (colorings[colorBy].scale) {
        /* scale set via JSON */
        ({ continuous, legendValues, colorScale } = createNonContinuousScaleFromProvidedScaleMap(
          colorBy,
          colorings[colorBy].scale,
          tree.nodes
        ));
      } else if (scaleType === 'categorical') {
        legendValues = getDiscreteValuesFromTree(tree.nodes, colorBy);
        colorScale = createDiscreteScale(legendValues, 'categorical');
      }

      if (scaleType !== 'continuous') domain = legendValues.slice();
    } else {
      throw new Error('Error in logic for processing colorings');
    }
    const visibleLegendValues = createVisibleLegendValues({
      colorBy,
      scaleType,
      legendValues,
      treeNodes: tree.nodes,
      visibility: tree.visibility
    });
    return {
      scale: colorScale,
      continuous,
      colorBy,
      version: controls.colorScale === undefined ? 1 : controls.colorScale.version + 1,
      legendValues,
      legendBounds,
      legendLabels,
      domain,
      scaleType: scaleType,
      visibleLegendValues: visibleLegendValues
    };
  } catch (error) {
    console.error('Error creating color scales. Details:\n', error.message);
    return {
      scale: () => unknownColor,
      continuous: false,
      colorBy,
      version: controls.colorScale === undefined ? 1 : controls.colorScale.version + 1,
      legendValues: ['unknown'],
      legendBounds: { unknown: [-Infinity, Infinity] },
      genotype: null,
      scaleType: null,
      domain: [],
      visibleLegendValues: ['unknown']
    };
  }
};
