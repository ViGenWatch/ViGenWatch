import React, { useEffect, useState } from 'react';
import style from './authorityReferences.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import RunButton from '../../../components/RunButton';
import ReadFile from '../../../components/ReadFile';
import { downloadFile, getReferenceContentFile, updateReferenceServiceRoleAuthority } from '../../../service/reference';
import { useDispatch } from 'react-redux';
import { Actions } from '../../../redux/reducer/inputDataReducer';
import { useTranslation } from 'react-i18next';
import { RiDeleteBin6Line } from 'react-icons/ri';

const cx = classNames.bind(style);

const ReferenceInfor = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    inputDataState,
    referencesState,
    authState,
    handleLoading,
    updateRequireStatus,
    getNewState,
    deleteReference
  } = props;
  const selectReference = referencesState.references.filter(
    (reference) => reference.id === inputDataState.selectedReferenceId
  )[0];
  const referenceFile = selectReference.referenceFile;
  const referenceFileArray = Object.entries(referenceFile)
    .filter(([, value]) => value !== null)
    .map(([key, value]) => ({ key, value }));

  const [optionFilter, setOptionFilter] = useState(referenceFileArray[0]);
  const [contentFile, setContentFile] = useState(null);

  const handleClickFilter = (index) => {
    setOptionFilter(referenceFileArray[index]);
  };
  useEffect(() => {
    setOptionFilter(referenceFileArray[0]);
  }, [inputDataState.selectedReferenceId]);

  useEffect(() => {
    const fetchContentFile = async () => {
      if (inputDataState.selectedReferenceId && optionFilter) {
        const content = await getReferenceContentFile(selectReference.id, optionFilter.value);
        if (content) {
          setContentFile(content);
        }
      }
    };
    fetchContentFile();
  }, [optionFilter]);

  const onDownloadFile = async () => {
    if (contentFile) {
      await downloadFile(selectReference.id, optionFilter.value);
    }
  };

  const onCloseReference = async () => {
    handleLoading(true);
    const referenceId = selectReference.id;
    dispatch(Actions.removeSelectReference());
    await updateReferenceServiceRoleAuthority({ referenceId, status: 0 });
    await getNewState();
    setTimeout(() => {
      props.handleLoading(false);
    }, 750);
  };

  return (
    <div className={cx('infor-reference-group')}>
      <div className={cx('infor-reference-group__header-group')}>
        <span className={cx('header-title')}>
          <span>{t('reference:Select Reference')}</span>
        </span>
        <RunButton
          inputDataState={inputDataState}
          referencesState={referencesState}
          authState={authState}
          handleLoading={handleLoading}
        />
      </div>
      <div className={cx('infor-reference-group__item')}>
        <div className={cx('item-reference-container')}>
          <div className={cx('icon-reference-group')}>
            <div className={cx('icon-reference-group__background')}>
              <span className={cx('icon-text')}>{selectReference.referenceName.charAt(0)}</span>
            </div>
          </div>
          <div className={cx('infor-reference-group')}>
            <div className={cx('infor-reference-group__btn')}>
              <div className={cx('infor-reference-group__btn-edit')}>
                {selectReference.status ? (
                  <button
                    className={cx(
                      'btn-edit-status',
                      selectReference.user.role === authState.user.role ? 'make-private' : 'close'
                    )}
                    onClick={
                      selectReference.user.role === authState.user.role
                        ? () => updateRequireStatus(selectReference.id, 0)
                        : onCloseReference
                    }
                  >
                    {selectReference.user.role === authState.user.role
                      ? t('reference:Make Private')
                      : t('reference:Close')}
                  </button>
                ) : selectReference.user.role === authState.user.role ? (
                  <button
                    className={cx('request-public', 'btn-edit-status')}
                    onClick={() => updateRequireStatus(selectReference.id, 1)}
                  >
                    {t('reference:Make Public')}
                  </button>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                    <button
                      className={cx('request-public', 'btn-edit-status')}
                      onClick={() => updateRequireStatus(selectReference.id, 1)}
                    >
                      {t('reference:Approve')}
                    </button>
                    <button className={cx('close', 'btn-edit-status')} onClick={onCloseReference}>
                      {t('reference:Close')}
                    </button>
                  </div>
                )}
              </div>
              {selectReference.user.role === authState.user.role && (
                <RiDeleteBin6Line className={cx('icon-delete')} onClick={() => deleteReference(selectReference.id)} />
              )}
            </div>
            <span className={cx('infor-reference-group__name')}>{selectReference.referenceName}</span>
            <div
              style={{ background: !selectReference.status && (selectReference.require ? '#ffca28' : '#e67030') }}
              className={cx('infor-reference-group__icon')}
            >
              {selectReference.status
                ? t('reference:Community')
                : selectReference.require
                  ? t('reference:Pending')
                  : t('reference:Private')}
            </div>
            <span
              className={cx('infor-reference-group__definition', 'infor-text')}
            >{`${t('reference:Definition')}: ${selectReference.definition}`}</span>
            <span
              className={cx('infor-reference-group__author', 'infor-text')}
            >{`${t('reference:Author')}: ${selectReference.author}`}</span>
            <span
              className={cx('infor-reference-group__version', 'infor-text')}
            >{`${t('reference:Version')}: ${selectReference.version}`}</span>
          </div>
        </div>
      </div>

      <ReadFile
        referenceFilterArray={referenceFileArray}
        handleClickFilter={handleClickFilter}
        optionFilter={optionFilter}
        contentFile={contentFile}
        onDownloadFile={onDownloadFile}
      />
    </div>
  );
};

ReferenceInfor.propTypes = {
  inputDataState: PropTypes.object.isRequired,
  referencesState: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired,
  handleLoading: PropTypes.func.isRequired,
  updateRequireStatus: PropTypes.func.isRequired,
  getNewState: PropTypes.func.isRequired,
  deleteReference: PropTypes.func.isRequired
};

export default ReferenceInfor;
