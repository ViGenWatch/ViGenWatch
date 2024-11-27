import AuthorityLayout from '../../../components/AuthorityLayout';
import { LOADING } from '../../../components/loading';
import MainComponent from '../../../components/Main';
import useExecution from '../../../hook/useExecution';

const AuthorityMain = () => {
  const { loading } = useExecution();

  return <AuthorityLayout index={3}>{!loading ? <MainComponent /> : <LOADING />}</AuthorityLayout>;
};

export default AuthorityMain;
