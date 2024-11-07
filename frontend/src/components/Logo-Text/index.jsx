import React from 'react';
import style from './logoText.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

const cx = classNames.bind(style);

const LogoText = ({ style }) => {
  return (
    <div style={style} className={cx('icon-group__text')}>
      <span className={cx('icon-group__text-n')}>N</span>
      <span className={cx('icon-group__text-e-1')}>e</span>
      <span className={cx('icon-group__text-x')}>x</span>
      <span className={cx('icon-group__text-t')}>t</span>
      <span className={cx('icon-group__text-c')}>c</span>
      <span className={cx('icon-group__text-l')}>l</span>
      <span className={cx('icon-group__text-a')}>a</span>
      <span className={cx('icon-group__text-d')}>d</span>
      <span className={cx('icon-group__text-e-2')}>e</span>
    </div>
  );
};

LogoText.propTypes = {
  style: PropTypes.object.isRequired
};

export default LogoText;
