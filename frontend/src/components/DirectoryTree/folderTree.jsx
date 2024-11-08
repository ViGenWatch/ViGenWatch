import React, { useState } from 'react';
import TreeNode from './TreeNode';
import useTreeState from '../../hook/useDirecoryTreeState';
import { ConfigContext } from './context';
import PropTypes from 'prop-types';
import style from './directoryTree.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

const FolderTree = ({
  data,
  iconComponents = {},
  onChange = console.log(''),
  initCheckedStatus = 'unchecked',
  initOpenStatus = 'closed',
  onNameClick = null
}) => {
  const options = {
    initCheckedStatus,
    initOpenStatus
  };
  const { treeState, reducers } = useTreeState({ data, options, onChange });
  const { toggleOpen } = reducers;
  const [nodeSelected, setNodeSelected] = useState('');

  if (!treeState) return null;
  const configs = {
    iconComponents,
    nodeSelected,
    handleToggle: toggleOpen,
    onNameClick,
    setNodeSelected
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
  onNameClick: PropTypes.func,

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
