import React, { useEffect, useState } from 'react';
import style from './reference.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import RunButton from '../../../components/RunButton';
import { downloadFile, getReferenceContentFile } from '../../../service/reference';
import ReadFile from '../../../components/ReadFile';
import { useTranslation } from 'react-i18next';
import { RiDeleteBin6Line } from 'react-icons/ri';

const cx = classNames.bind(style);

const ReferenceInfor = (props) => {
  const { t } = useTranslation();
  const { inputDataState, referencesState, authState, updateRequireStatus, deleteReference, handleStartUpload } = props;
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

  return (
    <div className={cx('infor-reference-group')}>
      <div className={cx('infor-reference-group__header-group')}>
        <span className={cx('header-title')}>
          <span>{t('reference:Select Reference Infor')}</span>
        </span>
        <RunButton handleStartUpload={handleStartUpload} />
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
                {selectReference.userId === authState.user.id &&
                  (selectReference.status ? (
                    <button
                      className={cx('make-private', 'btn-edit-status')}
                      onClick={() => updateRequireStatus(selectReference.id, 0)}
                    >
                      {t('reference:Make Private')}
                    </button>
                  ) : selectReference.require ? (
                    <button className={cx('pending', 'btn-edit-status')}>{t('reference:Pending')}</button>
                  ) : (
                    <button
                      className={cx('request-public', 'btn-edit-status')}
                      onClick={() => updateRequireStatus(selectReference.id, 1)}
                    >
                      {t('reference:Request Public')}
                    </button>
                  ))}
              </div>
              {selectReference.userId === authState.user.id && (
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
  updateRequireStatus: PropTypes.func.isRequired,
  deleteReference: PropTypes.func.isRequired,
  handleStartUpload: PropTypes.func.isRequired
};

export default ReferenceInfor;
