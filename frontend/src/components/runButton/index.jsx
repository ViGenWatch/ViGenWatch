import React from 'react';
import style from './runButton.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const RunButton = (props) => {
  const { inputDataState, referencesState, authState } = props;
  const navigate = useNavigate();
  const handleUpload = async () => {
    if (inputDataState.inputFilesData.length === 0 || inputDataState.indexReference === null) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('userId', authState.user.id);
    formData.append('userName', authState.user.userName);
    formData.append('referenceId', referencesState.references[inputDataState.indexReference].id);
    formData.append('referencePath', referencesState.references[inputDataState.indexReference].referencePath);
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
      navigate('/main');
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  return (
    <button className={cx('run_button')} onClick={handleUpload}>
      Run
    </button>
  );
};

RunButton.propTypes = {
  inputDataState: PropTypes.object.isRequired,
  referencesState: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired
};

export default RunButton;
