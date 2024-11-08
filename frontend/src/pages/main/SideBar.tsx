import { SidebarContainer, sidebarTheme } from '@khaitd0340/auspice/src/components/main/styles';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { RootState } from '../../redux/store';
import Controls from '../../components/Controls/Controls';

interface SidebarProps {
  width: number;
  height: number;
}

const SideBar: React.FC<SidebarProps> = ({ width, height }) => {
  const sidebarOpen = useSelector((state: RootState) => state.controls?.sidebarOpen);
  return (
    <ThemeProvider theme={sidebarTheme}>
      <SidebarContainer left={sidebarOpen ? 0 : -1 * width} width={width} height={height} theme={sidebarTheme}>
        <Controls />
      </SidebarContainer>
    </ThemeProvider>
  );
};
export default SideBar;
