import React, { useState } from 'react';
import LayoutComponent from '../../components/Layout';
import style from './reference.module.scss';
import classNames from 'classnames/bind';
import { IoIosArrowBack, IoIosArrowDown, IoIosSearch } from 'react-icons/io';
import ItemReference from './itemReference';
import { useNavigate } from 'react-router-dom';
import RunButton from '../../components/RunButton';
import useReferences from '../../hook/useReferences';
import CreateReference from './createReference';
import { LOADING } from '../../components/loading';

const cx = classNames.bind(style);

const ReferencePage = () => {
  const [openCreateReferecenceForm, setOpenCreateModal] = useState(false);
  const { referencesState, getReferences, authState, inputDataState } = useReferences();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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

  const handleStateOpen = () => {
    setOpenCreateModal((prevState) => !prevState);
  };

  const handleLoading = (isLoading) => {
    setLoading(isLoading);
  };

  return (
    <LayoutComponent index={2}>
      {!loading ? (
        <div
          style={{ justifyContent: !openCreateReferecenceForm && 'start' }}
          className={cx('section-page-reference', openCreateReferecenceForm && 'shifted')}
        >
          <div style={{ justifyContent: !openCreateReferecenceForm && 'start' }} className={cx('section-reference')}>
            <div style={{ marginLeft: !openCreateReferecenceForm && '15vw' }} className={cx('section-reference-group')}>
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

                    <div>
                      {!openCreateReferecenceForm && (
                        <button className={cx('create-new-config')} onClick={handleStateOpen}>
                          Create Reference Folder
                        </button>
                      )}
                      <RunButton
                        inputDataState={inputDataState}
                        referencesState={referencesState}
                        authState={authState}
                        handleLoading={handleLoading}
                      />
                    </div>
                  </div>
                </div>
                <div className={cx('section-reference-group__container-content')}>
                  {referencesState.references &&
                    referencesState.references
                      .filter((reference) => {
                        if (optionFilter.key === 1) {
                          return reference.userId === authState.user.id;
                        }
                        if (optionFilter.key === 2) {
                          return reference.userId !== authState.user.id;
                        }
                        return true;
                      })
                      .map((reference) => <ItemReference key={reference.id} {...reference} />)}
                </div>
              </div>
            </div>

            {openCreateReferecenceForm && (
              <CreateReference getNewState={getReferences} closeModal={handleStateOpen} handleLoading={handleLoading} />
            )}
          </div>
        </div>
      ) : (
        <LOADING />
      )}
    </LayoutComponent>
  );
};
export default ReferencePage;
