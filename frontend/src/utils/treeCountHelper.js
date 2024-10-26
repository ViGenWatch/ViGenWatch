import { NODE_VISIBLE } from './globals';
import { getTraiFromNode } from './treeMisHelpers';

export const calcTotalTipsInTree = (nodes) => {
  let count = 0;
  nodes.forEach((n) => {
    if (!n.hasChildren) count++;
  });
  return count;
};

export const calcFullTipCounts = (node) => {
  node.fullTipCount = node.children ? 0 : 1;

  node.children?.forEach((child) => {
    calcFullTipCounts(child);
    node.fullTipCount += child.fullTipCount;
  });
};

export const gatherTraitNames = (nodes, colorings) => {
  const ignore = new Set([
    'num_date',
    ...Object.keys(colorings).filter((name) => colorings[name].type === 'continuous')
  ]);

  return nodes
    .filter((node) => !node.hasChildren)
    .reduce((names, node) => {
      for (const traitName in node.node_attrs || {}) {
        if (!ignore.has(traitName) && !names.has(traitName) && getTraiFromNode(node, traitName)) {
          names.add(traitName);
        }
      }
      return names;
    }, new Set());
};

export const countTraitsAcrossTree = (nodes, traits, visibility, terminalOnly) => {
  const counts = {};
  traits.forEach((trait) => {
    counts[trait] = new Map();
  });

  nodes.forEach((node) => {
    if (terminalOnly && node.hasChildren) return;

    if (visibility && visibility[node.arrayIdx] !== NODE_VISIBLE) return;

    traits.forEach((trait) => {
      const value = getTraiFromNode(node, trait);
      if (value !== undefined) {
        counts[trait].set(value, (counts[trait].get(value) || 0) + 1);
      }
    });
  });

  return counts;
};

export const calcTipCounts = (node, visibility) => {
  if (node.children) {
    node.tipCount = node.children.reduce((count, child) => {
      calcTipCounts(child, visibility);
      return count + child.tipCount;
    }, 0);
  } else {
    node.tipCount = visibility[node.arrayIdx] === NODE_VISIBLE ? 1 : 0;
  }
};
