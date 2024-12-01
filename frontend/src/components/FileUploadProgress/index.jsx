import React from 'react';
import classNames from 'classnames/bind';
import style from './FileUploadProgress.module.scss';
import PropTypes from 'prop-types';
import { RiFileUploadLine } from 'react-icons/ri';

const cx = classNames.bind(style);

const FileUploadProgress = ({ fileName, fileSize, progress, top }) => {
  const formatFileSize = (bytes) => {
    if (bytes >= 1000000000) {
      return `${(bytes / 1000000000).toFixed(1)}gb`;
    }
    if (bytes >= 1000000) {
      return `${(bytes / 1000000).toFixed(1)}mb`;
    }
    return `${(bytes / 1000).toFixed(1)}kb`;
  };

  return (
    <div className={cx('wrapper')} style={{ top }}>
      <div className={cx('content')}>
        <div className={cx('file-info')}>
          <div className={cx('file-icon')}>
            <RiFileUploadLine className={cx('upload-icon')} />
          </div>
          <span className={cx('file-name')}>{fileName}</span>
        </div>
        <div className={cx('progress-bar')}>
          <div className={cx('progress-fill')} style={{ width: `${progress}%` }} />
        </div>
        <div className={cx('progress-text')}>
          <span>{formatFileSize(fileSize)}</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
};

FileUploadProgress.propTypes = {
  fileName: PropTypes.string.isRequired,
  fileSize: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired
};

export default FileUploadProgress;
