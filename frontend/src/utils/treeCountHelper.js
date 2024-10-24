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
