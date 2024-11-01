import styled, { ThemeProvider } from 'styled-components';
import { SidebarContainer as SidebarContainerBase } from 'auspice/src/components/main/styles';

const Container = styled.div`
  flex: 1;
  flex-basis: 100%;
  width: 100%;
  height: 100%;
  min-width: 1080px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
`;

const MainContent = styled.main`
  flex: 1;
  flex-basis: 100%;
  overflow-y: hidden;
`;

const AuspiceContainer = styled.div`
  display: flex;
  flex: 1;
  flex-basis: 99%;
  height: 100%;
`;

const SidebarContainer = styled(SidebarContainerBase)`
  position: unset !important;
  flex: 0 0 260px;
  overflow-y: auto;
`;

const TreeContainer = styled.div`
  flex: 1 1;
  overflow-y: scroll;
`;

const TreeTopPanel = styled.div`
  display: flex;
`;

const FiltersSummaryWrapper = styled.div`
  flex: 1 1 100%;
  padding-left: 1rem;
`;

const AUSPICE_SIDEBAR_THEME = {
  background: '#F2F2F2',
  color: '#000',
  sidebarBoxShadow: 'rgba(0, 0, 0, 0.2)',
  'font-family': 'Lato, Helvetica Neue, Helvetica, sans-serif',
  selectedColor: '#5097BA',
  unselectedColor: '#333',
  unselectedBackground: '#888'
};

const TreePageContent = () => {
  return (
    <Container>
      <MainContent>
        <AuspiceContainer>
          <ThemeProvider theme={AUSPICE_SIDEBAR_THEME as never}>
            <SidebarContainer>HHHH</SidebarContainer>
            <TreeContainer>
              <TreeTopPanel>
                <FiltersSummaryWrapper></FiltersSummaryWrapper>
              </TreeTopPanel>
            </TreeContainer>
          </ThemeProvider>
        </AuspiceContainer>
      </MainContent>
    </Container>
  );
};

export default TreePageContent;
