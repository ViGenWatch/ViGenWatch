import React from 'react';
import style from './ItemReference.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../../redux/reducer/inputDataReducer';

const cx = classNames.bind(style);

const ItemReference = (props) => {
  const { id, referenceName, author, definition, version, status, require } = props;
  const inputDataState = useSelector((state) => state.inputData);

  const dispatch = useDispatch();
  return (
    <div
      role='button'
      style={{
        background:
          inputDataState.selectedReferenceId !== null && inputDataState.selectedReferenceId === id
            ? 'rgb(49, 158, 244)'
            : '#ffffff'
      }}
      onClick={() => dispatch(Actions.setIndexReference(id))}
      className={cx('item-reference-container')}
    >
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

ItemReference.propTypes = {
  referenceName: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  definition: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  status: PropTypes.boolean,
  require: PropTypes.boolean
};

export default ItemReference;
