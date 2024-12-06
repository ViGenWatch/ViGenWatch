import React, { useState } from 'react';
import classNames from 'classnames/bind';
import style from './signup.module.scss';
import LogoText from '../../../components/Logo-Text';
import { MdEmail } from 'react-icons/md';
import { TbShieldLockFilled } from 'react-icons/tb';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { BsFillPersonFill } from 'react-icons/bs';
import { NavLink, useNavigate } from 'react-router-dom';
import { signUpService } from '../../../service/auth';
import { LOADING } from '../../../components/loading';

const cx = classNames.bind(style);

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({
    email: null,
    password: null,
    repassword: null,
    userName: null,
    role: '0x01'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(async () => {
      const res = await signUpService(inputData);
      if (res.status === 200) {
        navigate('/start');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ position: 'relative' }}>
      {loading ? (
        <LOADING />
      ) : (
        <div className={cx('signup-page')}>
          <LogoText style={{ fontSize: '60px', fontWeight: '300' }} />
          <span className={cx('signup-page__subtitle')}>
            quan hóa kết quả phân tích dữ liệu gen di truyền của dịch bệnh
          </span>
          <div className={cx('signup-page__container')}>
            <span className={cx('title-signup')}>Tạo tài khoản</span>

            <label className={cx('form-input-group')}>
              <span className={cx('form-input-group__label')}>Tài khoản</span>
              <div className={cx('form-input-group__input')}>
                <BsFillPersonFill size={'22px'} color={'rgb(33, 150, 243)'} />
                <input type='text' name='userName' placeholder='Tài khoản' onChange={onChangeInput} />
              </div>
            </label>

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
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  placeholder='Mật khẩu'
                  onChange={onChangeInput}
                />
                {showPassword ? (
                  <FaEye size={'22px'} color={'#bcc1c5'} cursor={'pointer'} onClick={() => setShowPassword(false)} />
                ) : (
                  <FaEyeSlash
                    size={'22px'}
                    color={'#bcc1c5'}
                    cursor={'pointer'}
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </label>

            <label className={cx('form-input-group')}>
              <span className={cx('form-input-group__label')}>Xác nhận mật khẩu</span>
              <div className={cx('form-input-group__input')}>
                <TbShieldLockFilled size={'22px'} color={'rgb(33, 150, 243)'} />
                <input
                  type={showRePassword ? 'text' : 'password'}
                  name='repassword'
                  placeholder='Xác nhận mật khẩu'
                  onChange={onChangeInput}
                />
                {showRePassword ? (
                  <FaEye size={'22px'} color={'#bcc1c5'} cursor={'pointer'} onClick={() => setShowRePassword(false)} />
                ) : (
                  <FaEyeSlash
                    size={'22px'}
                    color={'#bcc1c5'}
                    cursor={'pointer'}
                    onClick={() => setShowRePassword(true)}
                  />
                )}
              </div>
            </label>

            <button type='submit' className={cx('submit-button')} onClick={handleRegister}>
              Tạo tài khoản
            </button>
            <div className={cx('bottom-title')}>
              <span className={cx('title')}>Bạn đã có tài khoản? </span>
              <NavLink to={'/login'} className={cx('subtitle')}>
                Đăng nhập
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
