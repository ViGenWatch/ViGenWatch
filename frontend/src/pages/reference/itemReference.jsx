import React from 'react';
import style from './reference.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

const ItemReference = () => {
  return (
    <div className={cx('item-reference-container')}>
      <div className={cx('icon-reference-group')}>
        <div className={cx('icon-reference-group__background')}>
          <span className={cx('icon-text')}>Z</span>
        </div>
      </div>
      <div className={cx('infor-reference-group')}>
        <span className={cx('infor-reference-group__name')}>Zika</span>
        <div className={cx('infor-reference-group__icon')}>Official</div>
        <span className={cx('infor-reference-group__definition', 'infor-text')}>
          Definition: Zika virus strain PF13/251013-18, complete genome.
        </span>
        <span className={cx('infor-reference-group__author', 'infor-text')}>
          Author: Troesemeier,J.-H., Musso,D., Bluemel,J. and Baylis,S.A.
        </span>
        <span className={cx('infor-reference-group__version', 'infor-text')}>Version: KX369547.1 GI:1040461413</span>
      </div>
    </div>
  );
};

export default ItemReference;
