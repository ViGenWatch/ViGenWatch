import React, { useContext } from 'react';
import { ConfigContext } from './context';
import style from './directoryTree.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { FaRegFolderOpen, FaRegFolder, FaRegFile } from 'react-icons/fa';
import { AiFillCaretRight, AiFillCaretDown } from 'react-icons/ai';
import { getDefaultIcon } from './iconUtils';

const cx = classNames.bind(style);

const TreeNode = ({ path, name, isOpen, children }) => {
  const { iconComponents } = useContext(ConfigContext);

  const isFolder = !!children;

  const { CaretRightIcon = getDefaultIcon(AiFillCaretRight), CaretDownIcon = getDefaultIcon(AiFillCaretDown) } =
    iconComponents;

  let TypeIconType = 'FIleIcon';
  if (isFolder) {
    TypeIconType = isOpen ? 'FolderOpenIcon' : 'FolderIcon';
  }

  const TypeIcon = () => {
    if (isFolder) {
      return isOpen ? <FaRegFolderOpen className={cx('icon-size')} /> : <FaRegFolder className={cx('icon-size')} />;
    } else {
      return <FaRegFile className={cx('icon-size')} />;
    }
  };

  const FolderCaret = <span className={cx('caretContainer')}>{isOpen ? <CaretDownIcon /> : <CaretRightIcon />}</span>;

  return (
    <>
      <div className={cx('tree-node')}>
        {isFolder && FolderCaret}
        <div className={cx('typeIconContainer')}>
          <TypeIcon className={cx(TypeIconType)} />
        </div>

        <span className={cx('nameContainer')}>{name}</span>
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
