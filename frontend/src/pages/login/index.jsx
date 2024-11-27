import React, { useState } from 'react';
import style from './login.module.scss';
import classNames from 'classnames/bind';
import LogoText from '../../components/Logo-Text';
import { MdEmail } from 'react-icons/md';
import { TbShieldLockFilled } from 'react-icons/tb';
import useAuth from '../../hook/useAuth';
import { NavLink } from 'react-router-dom';
import { LOADING } from '../../components/loading';
import { FaEyeSlash } from 'react-icons/fa';

const cx = classNames.bind(style);

const LoginPage = () => {
  const { authState, signInRequest } = useAuth();
  const [inputData, setInputData] = useState({
    email: null,
    password: null
  });
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // const onChangeCheckbox = () => {
  //   const { remember_token } = inputData;

  //   setInputData((preData) => ({
  //     ...preData,
  //     remember_token: !remember_token
  //   }));
  // };
  //Mình viết đoạn này định làm cho xong chức năng có thể lựa chọn ghi nhớ đăng nhập hay không, do thời gian gấp nên mình để mặc định ghi nhớ đăng nhập luôn

  const handleSignIn = (e) => {
    e.preventDefault();
    signInRequest(inputData);
  };
  return (
    <div style={{ position: 'relative' }}>
      {authState.loading ? (
        <LOADING />
      ) : (
        <div className={cx('login-page')}>
          <LogoText style={{ fontSize: '60px', fontWeight: '300' }} />
          <span className={cx('login-page__subtitle')}>
            Trực quan hóa kết quả phân tích dữ liệu gen di truyền của dịch bệnh
          </span>
          <div className={cx('login-page__container')}>
            <span className={cx('title-login')}>Đăng nhập</span>
            <label className={cx('form-input-group')}>
              <span className={cx('form-input-group__label')}>Email</span>
              <div className={cx('form-input-group__input')}>
                <MdEmail size={'22px'} color={'rgb(33, 150, 243)'} />
                <input type='text' name='email' placeholder='Email' onChange={onChangeInput} />
              </div>
            </label>
            <label className={cx('form-input-group')}>
              <span className={cx('form-input-group__label')}>Mật khẩu</span>
              <div className={cx('form-input-group__input')}>
                <TbShieldLockFilled size={'22px'} color={'rgb(33, 150, 243)'} />
                <input type='password' name='password' placeholder='Mật khẩu' onChange={onChangeInput} />
                <FaEyeSlash size={'22px'} color={'#bcc1c5'} cursor={'pointer'} />
              </div>
            </label>
            <div className={cx('forgot-password')}>
              <NavLink style={{ color: 'rgb(33, 150, 243) ' }} to={'/forgot'} className={cx('forgot-password__title')}>
                Quên mật khẩu ?
              </NavLink>
            </div>
            <button type='submit' className={cx('submit-button')} onClick={handleSignIn}>
              Đăng nhập
            </button>
            <div className={cx('bottom-title')}>
              <span className={cx('title')}>Bạn chưa có tài khoản? </span>
              <NavLink to={'/signup'} className={cx('subtitle')}>
                Tạo tài khoản
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
