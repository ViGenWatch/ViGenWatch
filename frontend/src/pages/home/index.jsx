import React, { useState } from 'react';
import LayoutComponent from '../../components/layout';
import style from './home.module.scss';
import classNames from 'classnames/bind';
import LogoText from '../../components/logo-text';
import { IoMdArrowDropdown } from 'react-icons/io';

const cx = classNames.bind(style);

const HomePage = () => {
  const [toggle, setToggle] = useState(false);
  const [inputCategory, setInputCategory] = useState(1);
  return (
    <LayoutComponent>
      <div className={cx('section-start')}>
        <LogoText style={{ fontSize: '6rem', fontWeight: '300' }} />
        <span className={cx('subtitle')}>Clade assignment, mutation calling, and sequence quality checks</span>

        <div className={cx('input-group')}>
          <div className={cx('input-group__sequence')}>
            <div className={cx('input-group__sequence-header')}>
              <span>Select File Sequence Data</span>
            </div>
            <div className={cx('input-group__sequence-category')}>
              <button
                className={cx(`input-${inputCategory === 1 ? 'current' : 'category'}`)}
                onClick={() => setInputCategory(1)}
              >
                <span>File</span>
              </button>

              <button
                className={cx(`input-${inputCategory === 2 ? 'current' : 'category'}`)}
                onClick={() => setInputCategory(2)}
              >
                <span>Text</span>
              </button>

              <button className={cx('input-category')}>
                <span>Example</span>
                <IoMdArrowDropdown />
              </button>
            </div>
            {inputCategory === 1 ? (
              <div className={cx('input-group__sequence-input-1')}>
                <button className={cx('select-btn')}>Select Files</button>
              </div>
            ) : (
              <div className={cx('input-group__sequence-input-2')}>
                <span>Enter sequence data in FASTA format</span>
                <textarea className={cx('text-input')} />
                <div className={cx('submit-btn-group')}>
                  <span className={cx('reset-btn')}>Clear</span>
                  <btton className={cx('btn-submit')}>OK</btton>
                </div>
              </div>
            )}
          </div>

          <div className={cx('input-group__dataset')}>
            <div className={cx('input-group__dataset-header')}>
              <span>Select File Reference Dataset</span>
            </div>
            <div className={cx('input-group__dataset-suggest')}>
              <div className={cx('toggle-select')}>
                <button className={cx('toggle-btn', { toggled: toggle })} onClick={() => setToggle(!toggle)}>
                  <span className={cx('thumb')}></span>
                </button>
                <span>Suggest automatically</span>
              </div>

              <div className={cx('suggest-btn-group')}>
                <span>Reset</span>
                <button className={cx('suggest-btn-group__btn')}>Suggest</button>
              </div>
            </div>

            <div className={cx('input-group__dataset-input')}>
              <button className={cx('select-btn')}>Select Reference Files</button>
            </div>
          </div>
        </div>
      </div>
    </LayoutComponent>
  );
};

export default HomePage;
