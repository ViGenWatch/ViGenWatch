import React from 'react';
import style from './layout.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import IconNextcalde from './IconNexclade';
import { NavLink } from 'react-router-dom';
import { RiArrowRightSFill } from 'react-icons/ri';
import LogoText from '../logo-text';

const cx = classNames.bind(style);

const LayoutComponent = ({ children }) => {
  return (
    <div className={cx('section-layout')}>
      <div className={cx('section-layout__navbar')}>
        <div className={cx('icon-group')}>
          <IconNextcalde />
          <LogoText style={{ fontSize: '20px', fontWeight: '400' }} />
        </div>

        <div className={cx('button-nav-group')}>
          <div className={cx('button-nav-group__btn')}>
            <NavLink className={cx('navlink')} to='/start'>
              Start
            </NavLink>
          </div>
          <RiArrowRightSFill fontSize={'25px'} />
          <div className={cx('button-nav-group__btn')}>
            <NavLink className={cx('navlink')} to='/dataset'>
              Dataset
            </NavLink>
          </div>
          <RiArrowRightSFill fontSize={'25px'} />
          <div className={cx('button-nav-group__btn')}>
            <NavLink className={cx('navlink')} to='/start'>
              Tree
            </NavLink>
          </div>
          <RiArrowRightSFill fontSize={'25px'} />
          <div className={cx('button-nav-group__btn')}>
            <NavLink className={cx('navlink')} to='/start'>
              Export
            </NavLink>
          </div>
        </div>
      </div>
      <div className={cx('section-layout__content')}>{children}</div>
    </div>
  );
};

LayoutComponent.propTypes = {
  children: PropTypes.node.isRequired
};

export default LayoutComponent;
