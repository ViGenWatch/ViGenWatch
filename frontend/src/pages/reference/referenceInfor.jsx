import React, { useState } from 'react';
import style from './reference.module.scss';
import classNames from 'classnames/bind';
import { FiEdit } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';
import { MdOutlineFileDownload } from 'react-icons/md';

const cx = classNames.bind(style);

const ReferenceInfor = () => {
  const [optionFilter, setOptionFilter] = useState({
    value: 'All',
    key: 0
  });
  const filters = ['All', 'Your References', "System's References"];
  const [openFilter, setOpenFilter] = useState(false);

  const handleClickFiler = (index) => {
    setOptionFilter({
      value: filters[index],
      key: index
    });
  };
  return (
    <div className={cx('infor-reference-group')}>
      <div className={cx('infor-reference-group__header-group')}>
        <span className={cx('header-title')}>
          <span>Select Reference</span>
        </span>
        <button className={cx('create-new-config')}>Create Reference Folder</button>
      </div>
      <div className={cx('infor-reference-group__item')}>
        <div className={cx('item-reference-container')}>
          <div className={cx('icon-reference-group')}>
            <div className={cx('icon-reference-group__background')}>
              <span className={cx('icon-text')}>Zika</span>
            </div>
          </div>
          <div className={cx('infor-reference-group')}>
            <div className={cx('infor-reference-group__btn-edit')}>
              <FiEdit style={{ fontSize: '20px', color: 'rgb(33, 150, 243)', fontWeight: '400' }} />
              <span>Edit</span>
            </div>
            <span className={cx('infor-reference-group__name')}>sdfbashfbjsdbfas</span>
            <div style={{ background: !status && 'rgb(230, 112, 48)' }} className={cx('infor-reference-group__icon')}>
              {status ? 'Official' : 'Private'}
            </div>
            <span className={cx('infor-reference-group__definition', 'infor-text')}>{`Definition: $sfbjhbsdfjbf`}</span>
            <span className={cx('infor-reference-group__author', 'infor-text')}>{`Author: dnfasdknfasnf`}</span>
            <span className={cx('infor-reference-group__version', 'infor-text')}>{`Version: snfksnfksnfs`}</span>
          </div>
        </div>
      </div>

      <div className={cx('infor-reference-group__content')}>
        <div className={cx('infor-content-container')}>
          <div className={cx('reference-information-content')}>
            <div className={cx('header-group')}>
              <div role='button' className={cx('filter-group')} onClick={() => setOpenFilter(!openFilter)}>
                <span className={cx('text-filter')}>{optionFilter.value}</span>
                <IoIosArrowDown />

                <div className={cx('bar-options')} style={{ display: openFilter ? 'flex' : 'none' }}>
                  {filters.map((filter, index) => (
                    <span role='button' key={index} onClick={() => handleClickFiler(index)}>
                      {filter}
                    </span>
                  ))}
                </div>
              </div>

              <MdOutlineFileDownload style={{ fontSize: '25px', color: 'rgb(33,150,243)', cursor: 'pointer' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferenceInfor;
