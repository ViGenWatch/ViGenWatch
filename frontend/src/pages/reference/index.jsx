import React from 'react';
import LayoutComponent from '../../components/layout';
import style from './reference.module.scss';
import classNames from 'classnames/bind';
import { IoIosArrowBack, IoIosSearch } from 'react-icons/io';
import ItemReference from './itemReference';
import { useNavigate } from 'react-router-dom';
import RunButton from '../../components/runButton';
import { useSelector } from 'react-redux';
import useReferences from '../../hook/useReferences';

const cx = classNames.bind(style);

const ReferencePage = () => {
  const { referencesState } = useReferences();
  const authState = useSelector((state) => state.auth);
  const inputDataState = useSelector((state) => state.inputData);
  const navigate = useNavigate();
  return (
    <LayoutComponent>
      <div className={cx('section-reference')}>
        <div className={cx('section-reference-group')}>
          <div className={cx('section-reference-group__container')}>
            <div className={cx('section-reference-group__container-header')}>
              <button
                className={cx('add-data-btn')}
                onClick={() => {
                  navigate('/start');
                }}
              >
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
                <RunButton inputDataState={inputDataState} referencesState={referencesState} authState={authState} />
              </div>
            </div>
            <div className={cx('section-reference-group__container-content')}>
              {referencesState.references &&
                referencesState.references.map((reference, index) => (
                  <ItemReference key={reference.id} {...reference} index={index} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </LayoutComponent>
  );
};
export default ReferencePage;