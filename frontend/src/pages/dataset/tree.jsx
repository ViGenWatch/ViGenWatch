import React from 'react';

import styled from 'styled-components';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import AuspiceTree from '@khaitd0340/auspice/src/components/tree/tree';
const TREE_SIZE_HACK_WIDTH = 0.95;
const TREE_SIZE_HACK_HEIGHT = 0.9;

// const ENTROPY_ASPECT_RATIO = 16 / 5;

export const AuspiceEntropyContainer = styled.div`
  // prevent selection when dragging
  * {
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    user-select: none;
  }
`;

// export const AuspiceTreeStyled = styled(AuspiceTree)`
//   height: 100%;
//   width: 100%;
//   margin: 0;
//   padding: 0;
// `;

export const Tree = () => {
  const state = useSelector((state) => state);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const props = {
    tree: state.tree,
    treeToo: state.treeToo,
    selectedNode: state.controls.selectedNode,
    dateMinNumeric: state.controls.dateMinNumeric,
    dateMaxNumeric: state.controls.dateMaxNumeric,
    filters: state.controls.filters,
    quickdraw: state.controls.quickdraw,
    colorBy: state.controls.colorBy,
    colorByConfidence: state.controls.colorByConfidence,
    layout: state.controls.layout,
    scatterVariables: state.controls.scatterVariables,
    temporalConfidence: state.controls.temporalConfidence,
    distanceMeasure: state.controls.distanceMeasure,
    explodeAttr: state.controls.explodeAttr,
    focus: state.controls.focus,
    colorScale: state.controls.colorScale,
    colorings: state.metadata.colorings,
    genomeMap: state.entropy.genomeMap,
    showTreeToo: state.controls.showTreeToo,
    showTangle: state.controls.showTangle,
    panelsToDisplay: state.controls.panelsToDisplay,
    selectedBranchLabel: state.controls.selectedBranchLabel,
    canRenderBranchLabels: state.controls.canRenderBranchLabels,
    showAllBranchLabels: state.controls.showAllBranchLabels,
    tipLabelKey: state.controls.tipLabelKey,
    narrativeMode: state.narrative.display,
    animationPlayPauseButton: state.controls.animationPlayPauseButton,
    showOnlyPanels: state.controls.showOnlyPanels,
    t,
    dispatch
  };
  return (
    <AutoSizer>
      {({ width, height }) => {
        const fullWidth = width * TREE_SIZE_HACK_WIDTH;
        const treeHeight = height * TREE_SIZE_HACK_HEIGHT;
        // const entropyHeight = width / ENTROPY_ASPECT_RATIO;

        return (
          <>
            <AuspiceTree width={fullWidth} height={treeHeight} {...props} />
            <AuspiceEntropyContainer>
              {/* <AuspiceEntropy width={fullWidth} height={entropyHeight} /> */}
            </AuspiceEntropyContainer>
          </>
        );
      }}
    </AutoSizer>
  );
};
