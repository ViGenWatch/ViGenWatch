import React from 'react';
import style from './Layout.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import IconNextcalde from './IconNexclade';
import { NavLink } from 'react-router-dom';
import { RiArrowRightSFill } from 'react-icons/ri';
import LogoText from '../Logo-Text';
import { logoutFunc } from '../../service/auth';
import { useDispatch } from 'react-redux';
import { Actions } from '../../redux/reducer/authReducer';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(style);

const LayoutComponent = ({ children, index }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const props = {
    width: '35px',
    height: '35px'
  };

  const [language, setLanguage] = React.useState(i18n.language);

  const handleChange = (event) => {
    setLanguage(event.target.value);
    i18n.changeLanguage(event.target.value);
  };

  const handleLogout = async () => {
    await logoutFunc();
    dispatch(Actions.logout());
  };

  return (
    <div className={cx('section-layout')}>
      <div className={cx('section-layout__navbar')}>
        <div className={cx('section-layout__navbar-left')}>
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
              title={t('navbar:Show start page')}
            >
              <NavLink style={{ color: index === 1 && '#ffffff' }} className={cx('navlink')} to='/start'>
                {t('navbar:Start')}
              </NavLink>
            </div>
            <RiArrowRightSFill fontSize={'25px'} />
            <div
              className={cx('button-nav-group__btn')}
              style={{
                background: index === 2 && '#2296f3',
                fontWeight: index === 2 && '500'
              }}
              title={t('navbar:Select reference folder page')}
            >
              <NavLink style={{ color: index === 2 && '#ffffff' }} className={cx('navlink')} to='/reference'>
                {t('navbar:Reference')}
              </NavLink>
            </div>
            <RiArrowRightSFill fontSize={'25px'} />
            <div
              className={cx('button-nav-group__btn')}
              style={{
                background: index === 3 && '#2296f3',
                fontWeight: index === 3 && '500'
              }}
              title={t('navbar:Display a page for visualizing analysis results')}
            >
              <NavLink style={{ color: index === 3 && '#ffffff' }} className={cx('navlink')} to='/main'>
                {t('navbar:Main')}
              </NavLink>
            </div>
            <RiArrowRightSFill fontSize={'25px'} />
            <div
              className={cx('button-nav-group__btn')}
              style={{
                background: index === 5 && '#2296f3',
                fontWeight: index === 5 && '500'
              }}
              title={t('navbar:Export analysis results page')}
            >
              <NavLink style={{ color: index === 5 && '#ffffff' }} className={cx('navlink')} to='/export'>
                {t('navbar:Export')}
              </NavLink>
            </div>
            <RiArrowRightSFill fontSize={'25px'} />
            <div className={cx('button-nav-group__btn')} title={t('navbar:Show profile page')}>
              <NavLink onClick={handleLogout} className={cx('navlink')} to=''>
                {t('navbar:Profile')}
              </NavLink>
            </div>
            <RiArrowRightSFill fontSize={'25px'} />
            <div className={cx('button-nav-group__btn')} title={t('navbar:Logout')}>
              <NavLink onClick={handleLogout} className={cx('navlink')} to=''>
                {t('navbar:Logout')}
              </NavLink>
            </div>
          </div>
        </div>

        <div className={cx('section-layout__navbar-right')}>
          <span> {t('navbar:Language')}</span>
          <Box sx={{ minWidth: 110 }}>
            <FormControl fullWidth>
              <Select
                value={language}
                onChange={handleChange}
                sx={{
                  marginRight: '18px',
                  minWidth: '110px',
                  minHeight: '37px',
                  background: 'rgb(239, 241, 243)',
                  borderRadius: '3px',
                  '& .MuiSelect-select': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0px 5px',
                    color: 'rgb(73, 80, 87)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    textAlign: 'center',
                    textDecoration: 'none'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    border: '1px solid rgba(0, 0, 0, 0.067)',
                    color: 'rgb(73, 80, 87)'
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    border: '1px solid rgba(0, 0, 0, 0.067)',
                    color: 'rgb(73, 80, 87)'
                  }
                }}
              >
                <MenuItem value='vi'>{t('navbar:VietNam')}</MenuItem>
                <MenuItem value='en'>{t('navbar:English')}</MenuItem>
              </Select>
            </FormControl>
          </Box>
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
