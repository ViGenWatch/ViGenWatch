import React, { useContext } from 'react';
import { ConfigContext } from './context';
import style from './directoryTree.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { FaRegFolderOpen, FaRegFolder, FaRegFile } from 'react-icons/fa';
import { IoMdArrowDropdown, IoMdArrowDropright } from 'react-icons/io';

const cx = classNames.bind(style);

const TreeNode = ({ path, name, isOpen, children, ...restData }) => {
  const { handleToggle, onNameClick, nodeSelected, setNodeSelected } = useContext(ConfigContext);

  const isFolder = !!children;

  let TypeIconType = 'FIleIcon';
  if (isFolder) {
    TypeIconType = isOpen ? 'FolderOpenIcon' : 'FolderIcon';
  }

  const openFolder = () => handleToggle(path, true);
  const closeFolder = () => handleToggle(path, false);

  const TypeIcon = () => {
    if (isFolder) {
      return isOpen ? <FaRegFolderOpen className={cx('icon-size')} /> : <FaRegFolder className={cx('icon-size')} />;
    } else {
      return <FaRegFile className={cx('icon-size')} />;
    }
  };
  const ArrowIcon = () => {
    return isOpen ? (
      <IoMdArrowDropdown className={cx('icon-size', 'arrow-icon')} onClick={closeFolder} />
    ) : (
      <IoMdArrowDropright className={cx('icon-size', 'arrow-icon')} onClick={openFolder} />
    );
  };

  const handleNameClick = () => {
    const handleOpen = (isOpen) => {
      isOpen ? closeFolder() : openFolder();
    };
    if (onNameClick && typeof onNameClick === 'function') {
      const params = { path: restData['id'], type: restData['type'], isOpen };
      onNameClick(handleOpen, params, setNodeSelected);
    }
  };

  return (
    <>
      <div className={cx('tree-node')}>
        <div className={cx('typeIconContainer')}>
          <TypeIcon className={cx(TypeIconType)} />
        </div>

        <span
          role='button'
          style={{ color: nodeSelected === restData['id'] && 'rgb(33,150,243)' }}
          className={cx('nameContainer')}
          onClick={handleNameClick}
        >
          {name}
        </span>
        {isFolder && (
          <div className={cx('arrowIconContainer')}>
            <ArrowIcon />
          </div>
        )}
      </div>

      {isFolder && isOpen && (
        <div className={cx('children-container')}>
          {children.map((data, idx) => (
            <TreeNode key={data.id} path={[...path, idx]} {...data} />
          ))}
        </div>
      )}
    </>
  );
};

TreeNode.propTypes = {
  path: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  children: PropTypes.array
};

export default TreeNode;
