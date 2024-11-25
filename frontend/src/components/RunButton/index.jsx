import React from 'react';
import style from './runButton.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Actions } from '../../redux/reducer/executionReducer';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

const RunButton = (props) => {
  const { t } = useTranslation();
  const { inputDataState, referencesState, authState, handleLoading } = props;
  const navigate = useNavigate();
  const dispath = useDispatch();
  const handleUpload = async () => {
    if (inputDataState.inputFilesData.length === 0 || inputDataState.indexReference === null) {
      alert('Please select a file first.');
      return;
    }
    handleLoading(true);

    const formData = new FormData();
    formData.append('userId', authState.user.id);
    formData.append('userName', authState.user.userName);
    formData.append('referenceId', inputDataState.selectedReferenceId);
    formData.append(
      'referencePath',
      referencesState.references.filter((reference) => reference.id === inputDataState.selectedReferenceId)[0]
        .referencePath
    );
    inputDataState.inputFilesData.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await fetch('http://localhost:5050/api/file/upload', {
        method: 'POST',
        body: formData
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      handleLoading(false);
      dispath(Actions.setInitExecutionState());
      navigate('/main');
    } catch (error) {
      handleLoading(false);
      console.error('Error uploading files:', error);
    }
  };

  return (
    <button className={cx('run_button')} onClick={handleUpload}>
      {t('start:Run')}
    </button>
  );
};

RunButton.propTypes = {
  inputDataState: PropTypes.object.isRequired,
  referencesState: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired,
  handleLoading: PropTypes.func.isRequired
};

export default RunButton;
