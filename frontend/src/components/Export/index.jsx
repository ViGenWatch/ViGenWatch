import React from 'react';
import style from './Export.module.scss';
import classNames from 'classnames/bind';
import DirectoryTree from '../DirectoryTree';
import useDirectoryTree from '../../hook/useDirectoryTree';
import { FiDownload } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(style);

const ExportComponent = () => {
  const { t } = useTranslation();
  const { directoryTreeState, onNameClick, contentFile, onDownloadFile } = useDirectoryTree();
  return (
    <div className={cx('section-page-export')}>
      <div className={cx('section-export')}>
        <div className={cx('header-title')}>
          <span>{t('export:Read And Download Files')}</span>
        </div>
        <div className={cx('export-container')}>
          <DirectoryTree directoryTreeState={directoryTreeState} onNameClick={onNameClick} />
          <div className={cx('content-container')}>
            <div className={cx('content-container__header')}>
              <span>{contentFile ? contentFile.path : t('export:Please select a file in the sidebar column')}</span>
              <FiDownload id='link-download' className={cx('icon-download')} onClick={onDownloadFile} />
            </div>
            <div className={cx('content-container__content')}>
              <pre>{contentFile && contentFile.content}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportComponent;
