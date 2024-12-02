import React, { useEffect, useRef, useState } from 'react';
import style from './runButton.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);
import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';
// import { Actions } from '../../redux/reducer/executionReducer';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useWebSocket } from '../../hook/useWebSocket';
import { Actions } from '../../redux/reducer/inputDataReducer';

const RunButton = (props) => {
  const { t } = useTranslation();
  const { inputDataState, authState, setProgress } = props;
  // const navigate = useNavigate();
  const dispath = useDispatch();
  const API_URL = 'http://localhost:5050';
  const sessionIdRef = useRef(null);
  const abortControllerRef = useRef(null);
  const filesRef = useRef([]);
  const { socket, connected } = useWebSocket('ws://localhost:5050');
  const [uploadStatus, setUploadStatus] = useState(false);

  useEffect(() => {
    if (!socket) return;

    socket.addEventListener('message', handleSocketMessage);
    return () => {
      socket.removeEventListener('message', handleSocketMessage);
    };
  }, [socket]);

  const handleSocketMessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(data);
    switch (data.type) {
      case 'SESSION_CREATED': {
        sessionIdRef.current = data.sessionId;
        startUploading();
        break;
      }

      case 'PROGRESS_UPDATE':
        setProgress((prev) => ({
          ...prev,
          [data.fileIndex]: data.progress < 100 ? data.progress : 100
        }));
        break;

      case 'FILE_COMPLETED': {
        setProgress((prev) => {
          const newProgress = { ...prev };
          return newProgress;
        });
        break;
      }

      case 'UPLOAD_CANCELLED':
        handleUploadCancel();
        break;

      default:
        break;
    }
  };

  const handleStartUpload = () => {
    inputDataState.inputFilesData.forEach((file) => {
      filesRef.current.push(file);
    });
    console.log('Trước khi upload, files:', inputDataState.inputFilesData);

    if (!connected) {
      alert('Không có kết nối tới server');
      return;
    }

    if (inputDataState.inputFilesData.length === 0) {
      alert('Vui lòng chọn file để upload');
      return;
    }

    // handleLoading(true);
    setProgress(() => {
      const newProgress = {};
      for (let i = 0; i < inputDataState.inputFilesData.length; i++) {
        newProgress[i] = 0;
      }
      return newProgress;
    });
    abortControllerRef.current = new AbortController();

    socket.send(
      JSON.stringify({
        type: 'START_UPLOAD',
        files: inputDataState.inputFilesData.map((f) => ({
          name: f.name,
          size: f.size,
          userName: authState.user.userName
        }))
      })
    );
  };

  const startUploading = async () => {
    const chunkSize = 1024 * 1024;
    const maxConcurrent = 3;

    try {
      for (let fileIndex = 0; fileIndex < filesRef.current.length; fileIndex++) {
        const file = filesRef.current[fileIndex];
        const totalChunks = Math.ceil(file.size / chunkSize);
        for (let i = 0; i < totalChunks; i += maxConcurrent) {
          const chunkPromises = [];

          for (let j = 0; j < maxConcurrent && i + j < totalChunks; j++) {
            const chunkIndex = i + j;
            const chunk = file.slice(chunkIndex * chunkSize, (chunkIndex + 1) * chunkSize);

            const promise = fetch(`${API_URL}/api/file/upload-input-files`, {
              method: 'POST',
              headers: {
                'session-id': sessionIdRef.current,
                'file-index': fileIndex.toString(),
                'chunk-index': chunkIndex.toString(),
                'chunk-size': chunkSize.toString()
              },
              body: chunk,
              signal: abortControllerRef.current.signal
            }).then(() => {
              socket.send(
                JSON.stringify({
                  type: 'UPLOAD_PROGRESS',
                  sessionId: sessionIdRef.current,
                  fileIndex,
                  chunkIndex,
                  chunkSize
                })
              );
            });

            chunkPromises.push(promise);
          }

          await Promise.all(chunkPromises);
        }
      }

      // handleLoading(false);
      dispath(Actions.resetInputFilesData());
      filesRef.current = [];
      sessionIdRef.current = null;
      setUploadStatus(true);
      setProgress({});
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Upload bị hủy bởi người dùng');
      } else {
        console.error('Lỗi upload:', error);
      }
      // handleLoading(false);
    }
  };

  const handleUploadCancel = () => {
    if (sessionIdRef.current) {
      socket.send(
        JSON.stringify({
          type: 'CANCEL_UPLOAD',
          sessionId: sessionIdRef.current
        })
      );

      abortControllerRef.current?.abort();
      // handleLoading(false);
      setProgress({});
      sessionIdRef.current = null;
    }
  };

  // const handleUpload = async () => {
  //   if (inputDataState.inputFilesData.length === 0 || inputDataState.indexReference === null) {
  //     alert('Please select a file first.');
  //     return;
  //   }
  //   props.handleLoading(true);

  //   const formData = new FormData();
  //   formData.append('userId', authState.user.id);
  //   formData.append('userName', authState.user.userName);
  //   formData.append('referenceId', inputDataState.selectedReferenceId);
  //   formData.append(
  //     'referencePath',
  //     referencesState.references.filter((reference) => reference.id === inputDataState.selectedReferenceId)[0]
  //       .referencePath
  //   );
  //   inputDataState.inputFilesData.forEach((file) => {
  //     formData.append('files', file);
  //   });

  //   try {
  //     const response = await fetch('http://localhost:5050/api/file/upload', {
  //       method: 'POST',
  //       body: formData
  //     });
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     handleLoading(false);
  //     dispath(Actions.setInitExecutionState());
  //     navigate('/main');
  //   } catch (error) {
  //     handleLoading(false);
  //     console.error('Error uploading files:', error);
  //   }
  // };

  console.log(uploadStatus);

  return (
    <button className={cx('run_button')} onClick={handleStartUpload}>
      {t('start:Run')}
    </button>
  );
};

RunButton.propTypes = {
  inputDataState: PropTypes.object.isRequired,
  // referencesState: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired,
  // handleLoading: PropTypes.func.isRequired,
  setProgress: PropTypes.func.isRequired
};

export default RunButton;
