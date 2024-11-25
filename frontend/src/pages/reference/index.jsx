import React, { useState } from 'react';
import LayoutComponent from '../../components/Layout';
import style from './reference.module.scss';
import classNames from 'classnames/bind';
import { IoIosArrowBack, IoIosSearch } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import useReferences from '../../hook/useReferences';
import { LOADING } from '../../components/loading';
import ReferenceInfor from './ReferenceInfor';
import FilterGroup from '../../components/FilterGroup';
import ItemReference from '../../components/ItemReference';
import CreateReference from '../../components/CreateReference';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(style);

const ReferencePage = () => {
  const { t } = useTranslation();
  const [openCreateReferecenceForm, setOpenCreateModal] = useState(false);
  const { referencesState, getReferences, authState, inputDataState, updateRequireStatus } = useReferences();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [optionFilter, setOptionFilter] = useState({
    value: t('reference:All'),
    key: 0
  });
  const filters = [
    { value: t('reference:All'), key: 0 },
    { value: t('reference:Your References'), key: 1 },
    { value: t("reference:System's References"), key: 2 }
  ];

  const handleClickFilter = (index) => {
    setOptionFilter(filters[index]);
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
                    <span className={cx('text-btn')}>{t('reference:Add Data')}</span>
                  </button>

                  <div className={cx('title-search-group')}>
                    <span className={cx('title-select')}>{t('reference:Select reference dataset')}</span>
                    <div className={cx('search-form-group')}>
                      <IoIosSearch className={cx('icon-search')} />
                      <input className={cx('input-search')} placeholder={t('reference:Search reference')} />
                    </div>
                  </div>

                  <div className={cx('btn-run-group')}>
                    <FilterGroup
                      referenceFilterArray={filters}
                      handleClickFilter={handleClickFilter}
                      optionFilter={optionFilter}
                    />

                    <div>
                      {!openCreateReferecenceForm && (
                        <button className={cx('create-new-config')} onClick={handleStateOpen}>
                          {t('reference:Create Reference Folder')}
                        </button>
                      )}
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

            {!openCreateReferecenceForm && inputDataState.selectedReferenceId && (
              <ReferenceInfor
                inputDataState={inputDataState}
                referencesState={referencesState}
                authState={authState}
                handleLoading={handleLoading}
                updateRequireStatus={updateRequireStatus}
              />
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
