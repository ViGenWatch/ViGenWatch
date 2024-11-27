import React from 'react';
import style from './Start.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const cx = classNames.bind(style);

const ItemReferenceSelected = (props) => {
  const { referenceName, author, definition, version, status } = props;
  const { t } = useTranslation();
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
          {status ? t('start:Community') : require ? t('start:Pending') : t('start:Private')}
        </div>
        <span
          className={cx('infor-reference-group__definition', 'infor-text')}
        >{`${t('start:Definition')}: ${definition}`}</span>
        <span className={cx('infor-reference-group__author', 'infor-text')}>{`${t('start:Author')}: ${author}`}</span>
        <span
          className={cx('infor-reference-group__version', 'infor-text')}
        >{`${t('start:Version')}: ${version}`}</span>
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
