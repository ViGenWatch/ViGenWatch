import React from 'react';
import useDirectoryTree from '../../hook/useDirectoryTree';
import FolderTree from './folderTree';
import styles from './directoryTree.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const DirectoryTree = () => {
  const { directoryTreeState } = useDirectoryTree();
  return (
    <div className={cx('section-direc-tree')}>
      {directoryTreeState.nodeData && <FolderTree data={directoryTreeState.nodeData} />}
    </div>
  );
};

export default DirectoryTree;
