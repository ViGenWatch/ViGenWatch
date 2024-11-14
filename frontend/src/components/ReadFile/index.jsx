import React from 'react';
import classNames from 'classnames/bind';
import style from './ReadFile.module.scss';
import FilterGroup from '../FilterGroup';
import PropTypes from 'prop-types';
import { MdOutlineFileDownload } from 'react-icons/md';

const cx = classNames.bind(style);
const ReadFile = (props) => {
  const { referenceFilterArray, handleClickFilter, optionFilter, contentFile, onDownloadFile } = props;
  return (
    <div className={cx('infor-reference-group__content')}>
      <div className={cx('infor-content-container')}>
        <div className={cx('reference-information-content')}>
          <div className={cx('header-group')}>
            <div className={cx('filter-container')}>
              <FilterGroup
                referenceFilterArray={referenceFilterArray}
                handleClickFilter={handleClickFilter}
                optionFilter={optionFilter}
              />
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
  );
};

ReadFile.propTypes = {
  referenceFilterArray: PropTypes.array.isRequired,
  handleClickFilter: PropTypes.func.isRequired,
  optionFilter: PropTypes.object.isRequired,
  contentFile: PropTypes.string.isRequired,
  onDownloadFile: PropTypes.func.isRequired
};

export default ReadFile;
