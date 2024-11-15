import React from 'react';
import style from './Start.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

const cx = classNames.bind(style);

const ItemReferenceSelected = (props) => {
  const { referenceName, author, definition, version, status } = props;
  return (
    <div className={cx('item-reference-container')}>
      <div className={cx('icon-reference-group')}>
        <div className={cx('icon-reference-group__background')}>
          <span className={cx('icon-text')}>{referenceName.charAt(0)}</span>
        </div>
      </div>
      <div className={cx('infor-reference-group')}>
        <span className={cx('infor-reference-group__name')}>{referenceName}</span>
        <div
          style={{ background: !status && (require ? '#ffca28' : '#e67030') }}
          className={cx('infor-reference-group__icon')}
        >
          {status ? 'Community' : require ? 'Pending' : 'Private'}
        </div>
        <span className={cx('infor-reference-group__definition', 'infor-text')}>{`Definition: ${definition}`}</span>
        <span className={cx('infor-reference-group__author', 'infor-text')}>{`Author: ${author}`}</span>
        <span className={cx('infor-reference-group__version', 'infor-text')}>{`Version: ${version}`}</span>
      </div>
    </div>
  );
};

ItemReferenceSelected.propTypes = {
  referenceName: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  definition: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired,
  status: PropTypes.boolean
};

export default ItemReferenceSelected;
