import React, { useEffect, useState } from 'react';
import AuthorityLayout from '../../../components/AuthorityLayout';
import style from './authorityReferences.module.scss';
import classNames from 'classnames/bind';
import useReferencesAuthority from '../../../hook/authority/useReferencesAuthority';
import { useNavigate } from 'react-router';
import { LOADING } from '../../../components/loading';
import { IoIosArrowBack, IoIosSearch } from 'react-icons/io';
import FilterGroup from '../../../components/FilterGroup';
import ItemReference from '../../../components/ItemReference';
import { MdFilterList } from 'react-icons/md';
import ReferenceInfor from './ReferenceInfor';
import CreateReference from '../../../components/CreateReference';

const cx = classNames.bind(style);

const AuthorityReference = () => {
  const [openCreateReferecenceForm, setOpenCreateModal] = useState(false);
  const { referencesState, authState, getReferences, inputDataState } = useReferencesAuthority();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleLoading = (isLoading) => {
    setLoading(isLoading);
  };

  const [optionRoleFilter, setOptionRoleFilter] = useState({
    value: 'All',
    key: 0
  });

  const [optionStatusFilter, setOptionStatusFilter] = useState({
    value: 'Community',
    key: 0
  });

  const filters = [
    [
      { value: 'All', key: 0 },
      { value: 'Users References', key: 1 },
      { value: "System's References", key: 2 }
    ],
    [
      { value: 'Community', key: 0 },
      { value: 'Pending', key: 1 }
    ],
    [
      { value: 'Community', key: 0 },
      { value: 'Private', key: 1 }
    ]
  ];

  const handleClickRoleFilter = (index) => {
    setOptionRoleFilter(filters[0][index]);
  };

  const handleClickStatusFilter = (index) => {
    setOptionStatusFilter(optionRoleFilter.key === 1 ? filters[1][index] : filters[2][index]);
  };

  const handleStateOpen = () => {
    setOpenCreateModal((prevState) => !prevState);
  };

  useEffect(() => {
    if (optionRoleFilter.key === 1) {
      setOptionStatusFilter(filters[1][0]);
    } else if (optionRoleFilter.key === 2) {
      setOptionStatusFilter(filters[2][0]);
    }
  }, [optionRoleFilter]);

  return (
    <AuthorityLayout index={2}>
      {!loading ? (
        <div
          style={{ justifyContent: !openCreateReferecenceForm && !inputDataState.selectedReferenceId && 'start' }}
          className={cx(
            'section-page-reference',
            (openCreateReferecenceForm || inputDataState.selectedReferenceId) && 'shifted'
          )}
        >
          <div
            style={{ justifyContent: (!openCreateReferecenceForm || !inputDataState.selectedReferenceId) && 'start' }}
            className={cx('section-reference')}
          >
            <div
              style={{ marginLeft: !openCreateReferecenceForm && !inputDataState.selectedReferenceId && '15vw' }}
              className={cx('section-reference-group')}
            >
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
                    <span className={cx('title-select')}>Management References Folder</span>
                    <div className={cx('search-form-group')}>
                      <IoIosSearch className={cx('icon-search')} />
                      <input className={cx('input-search')} placeholder='Search reference' />
                    </div>
                  </div>

                  <div className={cx('btn-run-group')}>
                    <div className={cx('filter-group')}>
                      <MdFilterList style={{ fontSize: '25px', color: '#495057' }} />
                      <FilterGroup
                        referenceFilterArray={filters[0]}
                        handleClickFilter={handleClickRoleFilter}
                        optionFilter={optionRoleFilter}
                      />

                      {optionRoleFilter.key !== 0 &&
                        (optionRoleFilter.key === 1 ? (
                          <FilterGroup
                            referenceFilterArray={filters[1]}
                            handleClickFilter={handleClickStatusFilter}
                            optionFilter={optionStatusFilter}
                          />
                        ) : (
                          <FilterGroup
                            referenceFilterArray={filters[2]}
                            handleClickFilter={handleClickStatusFilter}
                            optionFilter={optionStatusFilter}
                          />
                        ))}
                    </div>

                    <div>
                      {!openCreateReferecenceForm && (
                        <button className={cx('create-new-config')} onClick={handleStateOpen}>
                          Create Reference Folder
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className={cx('section-reference-group__container-content')}>
                  {referencesState.references &&
                    referencesState.references
                      .filter((reference) => {
                        if (optionRoleFilter.key === 1) {
                          if (optionStatusFilter.key === 0) {
                            return reference.status && reference.user.role !== authState.user.role;
                          }
                          return !reference.status && reference.require && reference.user.role !== authState.user.role;
                        }
                        if (optionRoleFilter.key === 2) {
                          if (optionStatusFilter.key === 0) {
                            return reference.status && reference.user.role === authState.user.role;
                          }
                          return !reference.status && reference.user.role === authState.user.role;
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

            {!openCreateReferecenceForm && inputDataState.selectedReferenceId && (
              <ReferenceInfor
                inputDataState={inputDataState}
                referencesState={referencesState}
                authState={authState}
                handleLoading={handleLoading}
              />
            )}
          </div>
        </div>
      ) : (
        <LOADING />
      )}
    </AuthorityLayout>
  );
};

export default AuthorityReference;
