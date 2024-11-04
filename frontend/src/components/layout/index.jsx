import React from 'react';
import style from './layout.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import IconNextcalde from './IconNexclade';
import { NavLink } from 'react-router-dom';
import { RiArrowRightSFill } from 'react-icons/ri';
import LogoText from '../logo-text';

const cx = classNames.bind(style);

const LayoutComponent = ({ children, index }) => {
  return (
    <div className={cx('section-layout')}>
      <div className={cx('section-layout__navbar')}>
        <div className={cx('icon-group')}>
          <IconNextcalde />
          <LogoText style={{ fontSize: '20px', fontWeight: '400' }} />
        </div>

        <div className={cx('button-nav-group')}>
          <div
            className={cx('button-nav-group__btn')}
            style={{
              background: index === 1 && '#2296f3',
              fontWeight: index === 1 && '500'
            }}
          >
            <NavLink style={{ color: index === 1 && '#ffffff' }} className={cx('navlink')} to='/start'>
              Start
            </NavLink>
          </div>
          <RiArrowRightSFill fontSize={'25px'} />
          <div
            className={cx('button-nav-group__btn')}
            style={{
              background: index === 2 && '#2296f3',
              fontWeight: index === 2 && '500'
            }}
          >
            <NavLink style={{ color: index === 2 && '#ffffff' }} className={cx('navlink')} to='/reference'>
              Reference
            </NavLink>
          </div>
          <RiArrowRightSFill fontSize={'25px'} />
          <div
            className={cx('button-nav-group__btn')}
            style={{
              background: index === 3 && '#2296f3',
              fontWeight: index === 3 && '500'
            }}
          >
            <NavLink style={{ color: index === 3 && '#ffffff' }} className={cx('navlink')} to='/main'>
              Main
            </NavLink>
          </div>
          <RiArrowRightSFill fontSize={'25px'} />
          <div className={cx('button-nav-group__btn')}>
            <NavLink className={cx('navlink')} to='/start'>
              Edit
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
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired
};

export default LayoutComponent;
