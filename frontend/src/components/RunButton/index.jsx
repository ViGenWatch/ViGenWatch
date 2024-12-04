import React from 'react';
import style from './runButton.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const RunButton = (props) => {
  const { t } = useTranslation();
  const { handleStartUpload } = props;
  return (
    <button className={cx('run_button')} onClick={handleStartUpload}>
      {t('start:Run')}
    </button>
  );
};

RunButton.propTypes = {
  handleStartUpload: PropTypes.func.isRequired
};

export default RunButton;
