import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../redux/reducer/authReducer';
import { useEffect } from 'react';

const useAuth = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
  const dataSaveSession = JSON.parse(sessionStorage.getItem('user'));

  useEffect(() => {
    dataSaveSession
      ? dispatch(Actions.signInSuccess(dataSaveSession))
      : refreshToken && dispatch(Actions.getAccountRequest({ refreshToken }));
  }, []);

  useEffect(() => {
    if (!dataSaveSession && authState.user) {
      authState.user &&
        authState.user.accessToken &&
        sessionStorage.setItem('accessToken', JSON.stringify(authState.user.accessToken));

      authState.user && sessionStorage.setItem('user', JSON.stringify(authState.user));
      authState.user &&
        authState.user.newRefreshToken &&
        localStorage.setItem('refreshToken', JSON.stringify(authState.user.newRefreshToken));
    }
  }, [authState.user]);

  const signInRequest = (data) => {
    dispatch(Actions.signInRequest(data));
  };

  return { authState, signInRequest, refreshToken, dataSaveSession };
};

export default useAuth;
