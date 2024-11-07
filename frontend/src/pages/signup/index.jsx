import React, { useState } from 'react';
import classNames from 'classnames/bind';
import style from './signup.module.scss';
import LogoText from '../../components/Logo-Text';
import { MdEmail } from 'react-icons/md';
import { TbShieldLockFilled } from 'react-icons/tb';
import { FaEyeSlash } from 'react-icons/fa';
import { BsFillPersonFill } from 'react-icons/bs';
import { NavLink, useNavigate } from 'react-router-dom';
import { signUpService } from '../../service/auth';
import FadeLoader from 'react-spinners/FadeLoader';
const cx = classNames.bind(style);
const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState('none');
  const [inputData, setInputData] = useState({
    email: null,
    password: null,
    repassword: null,
    userName: null
  });
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading('flex');
    setTimeout(async () => {
      const res = await signUpService(inputData);
      if (res.status === 200) {
        navigate('/start');
      }
      setLoading('none');
    }, 1000);
  };
  return (
    <div style={{ position: 'relative' }}>
      <div className={cx('signup-page')}>
        <LogoText style={{ fontSize: '60px', fontWeight: '300' }} />
        <span className={cx('signup-page__subtitle')}>
          Clade assignment, mutation calling, and sequence quality checks
        </span>
        <div className={cx('signup-page__container')}>
          <span className={cx('title-signup')}>Sign Up</span>

          <label className={cx('form-input-group')}>
            <span className={cx('form-input-group__label')}>Account</span>
            <div className={cx('form-input-group__input')}>
              <BsFillPersonFill size={'22px'} color={'rgb(33, 150, 243)'} />
              <input type='text' name='userName' placeholder='Account' onChange={onChangeInput} />
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
            <span className={cx('form-input-group__label')}>Password</span>
            <div className={cx('form-input-group__input')}>
              <TbShieldLockFilled size={'22px'} color={'rgb(33, 150, 243)'} />
              <input type='password' name='password' placeholder='Password' onChange={onChangeInput} />
              <FaEyeSlash size={'22px'} color={'#bcc1c5'} cursor={'pointer'} />
            </div>
          </label>
          <label className={cx('form-input-group')}>
            <span className={cx('form-input-group__label')}>Confirm Password</span>
            <div className={cx('form-input-group__input')}>
              <TbShieldLockFilled size={'22px'} color={'rgb(33, 150, 243)'} />
              <input type='password' name='repassword' placeholder='Confirm Password' onChange={onChangeInput} />
              <FaEyeSlash size={'22px'} color={'#bcc1c5'} cursor={'pointer'} />
            </div>
          </label>
          <button type='submit' className={cx('submit-button')} onClick={handleRegister}>
            Sign Up
          </button>
          <div className={cx('bottom-title')}>
            <span className={cx('title')}>Already have an account? </span>
            <NavLink to={'/login'} className={cx('subtitle')}>
              Login
            </NavLink>
          </div>
        </div>
      </div>
      <div style={{ display: loading }} className={cx('loading')}>
        <div>
          <FadeLoader color='rgba(255, 255, 255, 1)' height='10' width='6' />
          <span style={{ fontWeight: '500', color: 'white', fontSize: '18px' }}>Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
