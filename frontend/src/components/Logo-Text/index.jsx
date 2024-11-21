import React from 'react';
import style from './logoText.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

const cx = classNames.bind(style);

const LogoText = ({ style }) => {
  return (
    <div style={style} className={cx('icon-group__text')}>
      <span className={cx('icon-group__text-n')}>N</span>
      <span className={cx('icon-group__text-e')}>e</span>
      <span className={cx('icon-group__text-x')}>x</span>
      <span className={cx('icon-group__text-t')}>t</span>
      <span className={cx('icon-group__text-p')}>P</span>
      <span className={cx('icon-group__text-h')}>h</span>
      <span className={cx('icon-group__text-y')}>y</span>
      <span className={cx('icon-group__text-l')}>l</span>
      <span className={cx('icon-group__text-o')}>o</span>
    </div>
  );
};

LogoText.propTypes = {
  style: PropTypes.object.isRequired
};

export default LogoText;
