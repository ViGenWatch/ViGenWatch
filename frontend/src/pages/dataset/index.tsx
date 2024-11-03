import styled from 'styled-components';
import LayoutComponent from '../../components/layout';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import SideBar from './SideBar';
import { numberOfGridPanels } from '@khaitd0340/auspice/src/actions/panelDisplay';
import { calcPanelDims, calcStyles } from '@khaitd0340/auspice/src/components/main/utils';
import { PanelsContainer } from '@khaitd0340/auspice/src/components/main/styles';
import TreeSection from '../../components/tree/Tree';
import MapSection from '../../components/map/Map';
import { Suspense } from 'react';
import EntropySection from '../../components/entropy/EntropySection';

const MainContainer = styled.div`
    position: 'relative';
    width: 100%,
    height: 100%,
    display: 'flex',
    flex-direction: 'row',
    justify-content: 'start',
    align-items: 'start',
  `;

const DatasetPage = () => {
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

  // const shouldShowMeasurementsLegend = () => {
  //   const showingTree = props.panelsToDisplay?.includes('tree');
  //   return !showingTree || inGrid();
  // };

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
    <LayoutComponent>
      <MainContainer>
        <SideBar width={sidebarWidth} height={availableHeight} />
        <PanelsContainer width={availableWidth} height={availableHeight} left={props.sidebarOpen ? sidebarWidth : 0}>
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
    </LayoutComponent>
  );
};

export default DatasetPage;
