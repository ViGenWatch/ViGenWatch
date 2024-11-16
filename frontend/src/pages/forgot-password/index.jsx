import React, { useState } from 'react';
import style from './forgot-password.module.scss';
import classNames from 'classnames/bind';
import { MdEmail } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { forgotPasswordService } from '../../service/auth';
import LogoText from '../../components/Logo-Text';

const cx = classNames.bind(style);

const ForgotPasswordPage = () => {
  const [inputData, setInputData] = useState({
    email: null
  });

  const [sendEmail, setSendEmail] = useState(false);

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
      setSendEmail(true);
    }
  };

  return (
    <div>
      {!sendEmail ? (
        <div style={{ position: 'relative' }}>
          <div className={cx('forgot-page')}>
            <LogoText style={{ fontSize: '60px', fontWeight: '300' }} />
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
              <div className={cx('bottom-title')}>
                <span className={cx('title')}>Remember your password? </span>
                <NavLink to={'/login'} className={cx('subtitle')}>
                  Back to login
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={cx('confirm-page')}>
          <LogoText style={{ fontSize: '60px', fontWeight: '300' }} />
          <div className={cx('confirm-page__container')}>
            <div className={cx('email-icon')}>
              <MdEmail size={'50px'} color={'rgb(33, 150, 243)'} />
            </div>
            <span className={cx('title-confirm')}>Check your email</span>
            <span className={cx('subtitle-confirm')}>An email has been sent to your email to reset your password.</span>
            <NavLink to={'/login'} className={cx('back-button')}>
              Back to Sign in
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
