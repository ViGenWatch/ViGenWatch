import LayoutComponent from '../../../components/Layout';
import useExecution from '../../../hook/useExecution';
import { LOADING } from '../../../components/loading';
import MainComponent from '../../../components/Main';

const MainPage = () => {
  const { loading } = useExecution();

  return <LayoutComponent index={3}>{!loading ? <MainComponent /> : <LOADING />}</LayoutComponent>;
};

export default MainPage;
