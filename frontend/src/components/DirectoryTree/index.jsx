import React from 'react';
import FolderTree from './folderTree';
import styles from './directoryTree.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const DirectoryTree = (props) => {
  const { directoryTreeState, onNameClick } = props;
  return (
    <div className={cx('section-direc-tree')}>
      {directoryTreeState.nodeData && <FolderTree data={directoryTreeState.nodeData} onNameClick={onNameClick} />}
    </div>
  );
};

DirectoryTree.propTypes = {
  directoryTreeState: PropTypes.object.isRequired,
  onNameClick: PropTypes.func.isRequired
};

export default DirectoryTree;
