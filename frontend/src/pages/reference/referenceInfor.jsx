import React, { useEffect, useState } from 'react';
import style from './reference.module.scss';
import classNames from 'classnames/bind';
import { FiEdit } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';
import { MdOutlineFileDownload } from 'react-icons/md';
import PropTypes from 'prop-types';
import RunButton from '../../components/RunButton';
import { downloadFile, getReferenceContentFile } from '../../service/reference';

const cx = classNames.bind(style);

const ReferenceInfor = (props) => {
  const { inputDataState, referencesState, authState, handleLoading } = props;
  const selectReference = referencesState.references.filter(
    (reference) => reference.id === inputDataState.selectedReferenceId
  )[0];
  const referenceFile = selectReference.referenceFile;
  const referenceFileArray = Object.entries(referenceFile)
    .filter(([, value]) => value !== null)
    .map(([key, value]) => ({ key, value }));

  const [optionFilter, setOptionFilter] = useState(referenceFileArray[0]);
  const [openFilter, setOpenFilter] = useState(false);
  const [contentFile, setContentFile] = useState(null);

  const handleClickFiler = (index) => {
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
          <span>Select Reference</span>
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
            <div className={cx('infor-reference-group__btn-edit')}>
              <FiEdit style={{ fontSize: '20px', color: 'rgb(33, 150, 243)', fontWeight: '400' }} />
              <span>Edit</span>
            </div>
            <span className={cx('infor-reference-group__name')}>{selectReference.referenceName}</span>
            <div style={{ background: !status && 'rgb(230, 112, 48)' }} className={cx('infor-reference-group__icon')}>
              {status ? 'Official' : 'Private'}
            </div>
            <span
              className={cx('infor-reference-group__definition', 'infor-text')}
            >{`Definition: ${selectReference.definition}`}</span>
            <span
              className={cx('infor-reference-group__author', 'infor-text')}
            >{`Author: ${selectReference.author}`}</span>
            <span
              className={cx('infor-reference-group__version', 'infor-text')}
            >{`Version: ${selectReference.version}`}</span>
          </div>
        </div>
      </div>

      <div className={cx('infor-reference-group__content')}>
        <div className={cx('infor-content-container')}>
          <div className={cx('reference-information-content')}>
            <div className={cx('header-group')}>
              <div className={cx('filter-container')}>
                <div role='button' className={cx('filter-group')} onClick={() => setOpenFilter(!openFilter)}>
                  <span className={cx('text-filter')}>{optionFilter.value}</span>
                  <IoIosArrowDown />

                  <div className={cx('bar-options')} style={{ display: openFilter ? 'flex' : 'none' }}>
                    {referenceFileArray.map((filter, index) => (
                      <span role='button' key={index} onClick={() => handleClickFiler(index)}>
                        {filter.value}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <MdOutlineFileDownload
                style={{ fontSize: '25px', color: 'rgb(33,150,243)', cursor: 'pointer' }}
                onClick={onDownloadFile}
              />
            </div>
            <div className={cx('content-file')}>
              <pre>{contentFile}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ReferenceInfor.propTypes = {
  inputDataState: PropTypes.object.isRequired,
  referencesState: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired,
  handleLoading: PropTypes.func.isRequired
};

export default ReferenceInfor;
