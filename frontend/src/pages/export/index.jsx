import React from 'react';
import LayoutComponent from '../../components/Layout';
import style from './export.module.scss';
import classNames from 'classnames/bind';
import DirectoryTree from '../../components/DirectoryTree';
import useDirectoryTree from '../../hook/useDirectoryTree';

const cx = classNames.bind(style);
const ExportPage = () => {
  const { directoryTreeState, onNameClick, contentFile } = useDirectoryTree();
  return (
    <LayoutComponent index={5}>
      <div className={cx('section-page-export')}>
        <div className={cx('section-export')}>
          <div className={cx('export-container')}>
            <DirectoryTree directoryTreeState={directoryTreeState} onNameClick={onNameClick} />
            <div className={cx('content-container')}>
              <pre>{contentFile}</pre>
            </div>
          </div>
        </div>
      </div>
    </LayoutComponent>
  );
};

export default ExportPage;
