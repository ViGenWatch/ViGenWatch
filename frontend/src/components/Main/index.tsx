import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import SideBar from './SideBar';
import { numberOfGridPanels } from '@khaitd0340/auspice/src/actions/panelDisplay';
import { calcPanelDims, calcStyles } from '@khaitd0340/auspice/src/components/main/utils';
import { PanelsContainer } from '@khaitd0340/auspice/src/components/main/styles';
import TreeSection from '../Tree/Tree';
import MapSection from '../Map/Map';
import { Suspense } from 'react';
import EntropySection from '../Entropy/EntropySection';
import InforSection from '../Infor/Infor';
import { calcUsableWidth } from '@khaitd0340/auspice/src/util/computeResponsive';

const MainContainer = styled.div`
    position: 'relative';
    width: 100%,
    height: 100%,
    display: 'flex',
    flex-direction: 'row',
    justify-content: 'start',
    align-items: 'start',
    // overflow-y: 'scroll'
  `;

const MainComponent = () => {
  const state = useSelector((state: RootState) => state);
  const props = {
    panelsToDisplay: state.controls?.panelsToDisplay,
    panelLayout: state.controls?.panelLayout,
    displayNarrative: state.narrative?.display,
    narrativeIsLoaded: state.narrative?.loaded,
    browserDimensions: state.browserDimensions?.browserDimensions || {},
    frequenciesLoaded: state.frequencies?.loaded,
    metadataLoaded: state.metadata?.loaded,
    treeLoaded: state.tree?.loaded,
    sidebarOpen: state.controls?.sidebarOpen,
    showOnlyPanels: state.controls?.showOnlyPanels,
    treeName: state.tree?.name
  };
  const inGrid = () => {
    return props.panelLayout === 'grid';
  };

  const shouldMapBeInGrid = () => {
    const evenNumberOfGridPanels = numberOfGridPanels(props.panelsToDisplay ?? []) % 2 === 0;
    return inGrid() && evenNumberOfGridPanels;
  };

  const shouldShowMapLegend = () => {
    return !shouldMapBeInGrid();
  };

  const { availableWidth, availableHeight, sidebarWidth } = calcStyles(
    props.browserDimensions,
    props.displayNarrative,
    props.sidebarOpen ?? true,
    false
  );

  const { full, grid, chartEntropy } = calcPanelDims(
    props.panelsToDisplay,
    props.displayNarrative,
    availableWidth,
    availableHeight
  );

  return (
    <MainContainer>
      <SideBar width={sidebarWidth} height={availableHeight} />
      <PanelsContainer width={availableWidth} height={availableHeight} left={props.sidebarOpen ? sidebarWidth : 0}>
        {props.displayNarrative || props.showOnlyPanels ? null : (
          <InforSection width={calcUsableWidth(availableWidth, 1)} />
        )}
        {props.panelsToDisplay?.includes('tree') ? (
          <TreeSection width={inGrid() ? grid.width : full.width} height={inGrid() ? grid.height : full.height} />
        ) : null}
        {props.panelsToDisplay?.includes('map') ? (
          <MapSection
            width={shouldMapBeInGrid() ? grid.width : full.width}
            height={shouldMapBeInGrid() ? grid.height : full.height}
            justGotNewDatasetRenderNewMap={false}
            legend={shouldShowMapLegend()}
          />
        ) : null}
        {props.panelsToDisplay?.includes('entropy') ? (
          <Suspense fallback={null}>
            <EntropySection width={chartEntropy.width} height={chartEntropy.height} />
          </Suspense>
        ) : null}
      </PanelsContainer>
    </MainContainer>
  );
};

export default MainComponent;
