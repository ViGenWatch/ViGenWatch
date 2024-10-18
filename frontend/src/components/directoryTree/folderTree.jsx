import React from 'react';
import TreeNode from './treeNode';
import useTreeState from '../../hook/useDirecoryTreeState';
import { ConfigContext } from './context';
import PropTypes from 'prop-types';
import style from './directoryTree.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

const FolderTree = ({
  data,
  iconComponents = {},
  onChange = console.log('abc'),
  initCheckedStatus = 'unchecked',
  initOpenStatus = 'open'
}) => {
  const options = {
    initCheckedStatus,
    initOpenStatus
  };
  const { treeState } = useTreeState({ data, options, onChange });
  if (!treeState) return null;
  const configs = {
    iconComponents
  };

  return (
    <div className={cx('folder-tree')}>
      <ConfigContext.Provider value={configs}>
        <TreeNode key={treeState.id} path={[]} {...treeState} />
      </ConfigContext.Provider>
    </div>
  );
};

FolderTree.propTypes = {
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  initCheckedStatus: PropTypes.string,
  initOpenStatus: PropTypes.string,

  iconComponents: PropTypes.shape({
    FileIcon: PropTypes.func,
    FolderIcon: PropTypes.func,
    FolderOpenIcon: PropTypes.func,
    EditIcon: PropTypes.func,
    DeleteIcon: PropTypes.func,
    CancelIcon: PropTypes.func,
    AddFileIcon: PropTypes.func,
    AddFolderIcon: PropTypes.func,
    CaretRightIcon: PropTypes.func,
    CaretDownIcon: PropTypes.func
  })
};

export default FolderTree;
