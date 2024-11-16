import React, { useState } from 'react';
import style from './forgot-password.module.scss';
import classNames from 'classnames/bind';
import { MdEmail } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { forgotPasswordService } from '../../service/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(style);

const ForgotPasswordPage = () => {
  const [inputData, setInputData] = useState({
    email: null
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const responce = await forgotPasswordService(inputData);
    if (responce.status === 200) {
      toast('Wow so easy!');
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <div className={cx('forgot-page')}>
        <div className={cx('forgot-page__container')}>
          <span className={cx('title-forgot')}>Reset Password</span>
          <span className={cx('subtitle-forgot')}>Enter the email address you use to sign in.</span>
          <label className={cx('form-input-group')}>
            <span className={cx('form-input-group__label')}>Email address *</span>
            <div className={cx('form-input-group__input')}>
              <MdEmail size={'22px'} color={'rgb(33, 150, 243)'} />
              <input type='text' name='email' placeholder='Enter your email' onChange={onChangeInput} />
            </div>
          </label>
          <button type='submit' className={cx('submit-button')} onClick={(e) => handleForgotPassword(e)}>
            Get Password Reset Link
          </button>
          <ToastContainer />
          <div className={cx('bottom-title')}>
            <span className={cx('title')}>Remember your password? </span>
            <NavLink to={'/login'} className={cx('subtitle')}>
              Back to login
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
