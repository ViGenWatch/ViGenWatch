import React from 'react';
import style from './Layout.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import IconNextcalde from './IconNexclade';
import { NavLink } from 'react-router-dom';
import { RiArrowRightSFill } from 'react-icons/ri';
import LogoText from '../Logo-Text';

const cx = classNames.bind(style);

const LayoutComponent = ({ children, index }) => {
  const props = {
    width: '35px',
    height: '35px'
  };
  return (
    <div className={cx('section-layout')}>
      <div className={cx('section-layout__navbar')}>
        <div className={cx('icon-group')}>
          <IconNextcalde {...props} />
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
          <div
            className={cx('button-nav-group__btn')}
            style={{
              background: index === 4 && '#2296f3',
              fontWeight: index === 4 && '500'
            }}
          >
            <NavLink style={{ color: index === 4 && '#ffffff' }} className={cx('navlink')} to='/edit'>
              Edit
            </NavLink>
          </div>
          <RiArrowRightSFill fontSize={'25px'} />
          <div
            className={cx('button-nav-group__btn')}
            style={{
              background: index === 5 && '#2296f3',
              fontWeight: index === 5 && '500'
            }}
          >
            <NavLink style={{ color: index === 5 && '#ffffff' }} className={cx('navlink')} to='/export'>
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
