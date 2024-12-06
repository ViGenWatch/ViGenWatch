import React, { useEffect, useState } from 'react';
import style from './reset-password.module.scss';
import classNames from 'classnames/bind';
import LogoText from '../../../components/Logo-Text';
import { TbShieldLockFilled } from 'react-icons/tb';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { LOADING } from '../../../components/loading';
import { useNavigate, useParams } from 'react-router-dom';
import { checkTokenResetPasswordService, resetPasswordService } from '../../../service/auth';

const cx = classNames.bind(style);

const NewPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false
  });
  const [inputData, setInputData] = useState({
    userId: null,
    newPassword: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [checkToken, setCheckToken] = useState(false);

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  useEffect(() => {
    const checkTokenApi = async () => {
      const response = await checkTokenResetPasswordService(token);
      if (response.status === 200) {
        setInputData((prevData) => ({
          ...prevData,
          userId: response.data.userId
        }));
        setCheckToken(true);
      } else {
        setCheckToken(false);
        navigate('/forgot');
      }
    };
    checkTokenApi();
  }, []);

  const handleResetPassword = async (e) => {
    setLoading(true);
    e.preventDefault();
    const response = await resetPasswordService(inputData, token);
    if (response.status === 200) {
      setLoading(false);
      navigate('/login');
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {loading ? (
        <LOADING />
      ) : (
        checkToken && (
          <div className={cx('reset-page')}>
            <LogoText style={{ fontSize: '60px', fontWeight: '300' }} />
            <div className={cx('reset-page__container')}>
              <span className={cx('title-reset')}>Create New Password</span>
              <span className={cx('subtitle-reset')}>
                Your new password must be different from previous used passwords
              </span>

              <label className={cx('form-input-group')}>
                <span className={cx('form-input-group__label')}>New Password *</span>
                <div className={cx('form-input-group__input')}>
                  <TbShieldLockFilled size={'22px'} color={'rgb(33, 150, 243)'} />
                  <input
                    type={showPassword.newPassword ? 'text' : 'password'}
                    name='newPassword'
                    placeholder='Enter new password'
                    onChange={onChangeInput}
                  />
                  {showPassword.newPassword ? (
                    <FaEye
                      size={'22px'}
                      color={'#bcc1c5'}
                      cursor={'pointer'}
                      onClick={() => togglePasswordVisibility('newPassword')}
                    />
                  ) : (
                    <FaEyeSlash
                      size={'22px'}
                      color={'#bcc1c5'}
                      cursor={'pointer'}
                      onClick={() => togglePasswordVisibility('newPassword')}
                    />
                  )}
                </div>
              </label>

              <label className={cx('form-input-group')}>
                <span className={cx('form-input-group__label')}>Confirm New Password *</span>
                <div className={cx('form-input-group__input')}>
                  <TbShieldLockFilled size={'22px'} color={'rgb(33, 150, 243)'} />
                  <input
                    type={showPassword.confirmPassword ? 'text' : 'password'}
                    name='confirmPassword'
                    placeholder='Confirm new password'
                    onChange={onChangeInput}
                  />
                  {showPassword.confirmPassword ? (
                    <FaEye
                      size={'22px'}
                      color={'#bcc1c5'}
                      cursor={'pointer'}
                      onClick={() => togglePasswordVisibility('confirmPassword')}
                    />
                  ) : (
                    <FaEyeSlash
                      size={'22px'}
                      color={'#bcc1c5'}
                      cursor={'pointer'}
                      onClick={() => togglePasswordVisibility('confirmPassword')}
                    />
                  )}
                </div>
              </label>

              <button type='submit' className={cx('submit-button')} onClick={(e) => handleResetPassword(e)}>
                Reset Password
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default NewPasswordPage;
