import React from 'react';
import style from './logoText.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

const cx = classNames.bind(style);

const LogoText = ({ style }) => {
  return (
    <div style={style} className={cx('icon-group__text')}>
      <span className={cx('icon-group__text-v')}>V</span>
      <span className={cx('icon-group__text-i')}>i</span>
      <span className={cx('icon-group__text-g')}>G</span>
      <span className={cx('icon-group__text-e')}>e</span>
      <span className={cx('icon-group__text-n')}>n</span>
      <span className={cx('icon-group__text-w')}>W</span>
      <span className={cx('icon-group__text-a')}>a</span>
      <span className={cx('icon-group__text-t')}>t</span>
      <span className={cx('icon-group__text-c')}>c</span>
      <span className={cx('icon-group__text-h')}>h</span>
    </div>
  );
};

LogoText.propTypes = {
  style: PropTypes.object.isRequired
};

export default LogoText;
