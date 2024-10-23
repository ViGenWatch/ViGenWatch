import React from 'react';
import LayoutComponent from '../../components/layout';
import style from './reference.module.scss';
import classNames from 'classnames/bind';
import { IoIosArrowBack, IoIosSearch } from 'react-icons/io';
import ItemReference from './itemReference';

const cx = classNames.bind(style);

const ReferencePage = () => {
  return (
    <LayoutComponent>
      <div className={cx('section-reference')}>
        <div className={cx('section-reference-group')}>
          <div className={cx('section-reference-group__container')}>
            <div className={cx('section-reference-group__container-header')}>
              <button className={cx('add-data-btn')}>
                <IoIosArrowBack className={cx('icon-btn')} />
                <span className={cx('text-btn')}>Add Data</span>
              </button>

              <div className={cx('title-search-group')}>
                <span className={cx('title-select')}>Select reference dataset</span>
                <div className={cx('search-form-group')}>
                  <IoIosSearch className={cx('icon-search')} />
                  <input className={cx('input-search')} placeholder='Search reference' />
                </div>
              </div>

              <div className={cx('btn-run-group')}>
                <button className={cx('btn-run')}>Run</button>
              </div>
            </div>
            <div className={cx('section-reference-group__container-content')}>
              <ItemReference />
              <ItemReference />
              <ItemReference />
              <ItemReference />
              <ItemReference />
              <ItemReference />
            </div>
          </div>
        </div>
      </div>
    </LayoutComponent>
  );
};

export default ReferencePage;
