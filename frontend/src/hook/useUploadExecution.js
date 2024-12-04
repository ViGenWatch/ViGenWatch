import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ActionsExecution } from '../redux/reducer/executionReducer';
import { Actions } from '../redux/reducer/inputDataReducer';
import { useWebSocket } from './useWebSocket';
import { createExecution } from '../service/execution';
import { useEffect, useState } from 'react';
import useReferences from './useReferences';
import useReferencesAuthority from './authority/useReferencesAuthority';

const useUploadExecution = (handleLoading) => {
  const authState = useSelector((state) => state.auth);
  const { referencesState, getReferences, updateRequireStatus, deleteReference } =
    authState.user.role === '0x01' ? useReferences() : useReferencesAuthority();
  const inputDataState = useSelector((state) => state.inputData);
  const [sessionId, setSessionId] = useState(null);
  const [progress, setProgress] = useState({});
  const [files, setFiles] = useState([]);
  const [abortController, setAbortController] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const API_URL = 'http://localhost:5050';
  const { socket, connected } = useWebSocket('ws://localhost:5050');
  const [uploadStatus, setUploadStatus] = useState({
    uploadFile: false,
    uploadInfor: false
  });

  useEffect(() => {
    if (!socket) return;

    const handleSocketMessage = (event) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case 'SESSION_CREATED': {
          setSessionId(data.sessionId);
          break;
        }
        case 'PROGRESS_UPDATE': {
          if (!uploadStatus.uploadFile) {
            setProgress((prev) => {
              if (prev[data.fileIndex] >= 0) {
                return {
                  ...prev,
                  [data.fileIndex]: data.progress < 100 ? data.progress : 100
                };
              }
              return prev;
            });
          }
          break;
        }
        case 'PROCESSING_COMMAND': {
          handleLoading(true);
          break;
        }
        case 'EXECUTION_ANALYSIS_NOT_FOUND': {
          dispatch(Actions.resetInputFilesData());
          setSessionId(null);
          handleLoading(false);
          break;
        }
        case 'COMPLETE_ANALYSIS_EXECUTION': {
          dispatch(Actions.resetInputFilesData());
          setSessionId(null);
          handleLoading(false);
          dispatch(ActionsExecution.setInitExecutionState());
          navigate('/main');
          break;
        }
        case 'UPLOAD_CANCELLED': {
          handleUploadCancel();
          break;
        }
      }
    };

    socket.addEventListener('message', handleSocketMessage);
    return () => socket.removeEventListener('message', handleSocketMessage);
  }, [socket, uploadStatus.uploadFile]);

  useEffect(() => {
    if (!sessionId) return;
    startUploading();
  }, [sessionId]);

  useEffect(() => {
    if (!sessionId || !inputDataState.selectedReferenceId) return;

    const uploadInforExecution = async () => {
      const referenceId = inputDataState.selectedReferenceId;
      const referencePath = referencesState.references.find((ref) => ref.id === referenceId)?.referencePath;

      try {
        const response = await createExecution({
          referenceId,
          referencePath,
          folderName: sessionId
        });

        if (response.status === 200) {
          setUploadStatus((prev) => ({ ...prev, uploadInfor: true }));
        }
      } catch (error) {
        console.error('Upload execution info error:', error);
      }
    };

    uploadInforExecution();
  }, [sessionId, inputDataState.selectedReferenceId]);

  useEffect(() => {
    if (!uploadStatus.uploadFile || !uploadStatus.uploadInfor || !sessionId) return;

    socket.send(
      JSON.stringify({
        type: 'RUN_EXECUTION',
        referenceId: inputDataState.selectedReferenceId,
        userName: authState.user.userName,
        executionName: sessionId
      })
    );
  }, [uploadStatus, sessionId]);

  const startUploading = async () => {
    const chunkSize = 1024 * 1024;
    const maxConcurrent = 3;

    try {
      for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
        const file = files[fileIndex];
        const totalChunks = Math.ceil(file.size / chunkSize);

        for (let i = 0; i < totalChunks; i += maxConcurrent) {
          const chunkPromises = [];

          for (let j = 0; j < maxConcurrent && i + j < totalChunks; j++) {
            const chunkIndex = i + j;
            const chunk = file.slice(chunkIndex * chunkSize, (chunkIndex + 1) * chunkSize);

            const promise = fetch(`${API_URL}/api/file/upload-input-files`, {
              method: 'POST',
              headers: {
                'session-id': sessionId,
                'file-index': fileIndex.toString(),
                'chunk-index': chunkIndex.toString(),
                'chunk-size': chunkSize.toString()
              },
              body: chunk,
              signal: abortController?.signal
            }).then(() => {
              socket?.send(
                JSON.stringify({
                  type: 'UPLOAD_PROGRESS',
                  sessionId,
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

      setProgress({});
      setFiles([]);
      setUploadStatus((prev) => ({ ...prev, uploadFile: true }));
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Upload cancelled by user');
      } else {
        console.error('Upload error:', error);
      }
    }
  };

  const handleStartUpload = () => {
    if (!connected) {
      alert('No server connection');
      return;
    }

    if (inputDataState.inputFilesData.length === 0 || inputDataState.indexReference === null) {
      alert('Please select files and reference dataset');
      return;
    }

    setFiles(inputDataState.inputFilesData);
    setUploadStatus({
      uploadFile: false,
      uploadInfor: false
    });
    setProgress(() => {
      const newProgress = {};
      for (let i = 0; i < inputDataState.inputFilesData.length; i++) {
        newProgress[i] = 0;
      }
      return newProgress;
    });

    setAbortController(new AbortController());

    socket?.send(
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

  const handleUploadCancel = () => {
    if (sessionId && socket) {
      socket.send(
        JSON.stringify({
          type: 'CANCEL_UPLOAD',
          sessionId
        })
      );

      abortController?.abort();
      setProgress({});
      setSessionId(null);
      setAbortController(null);
    }
  };

  return {
    handleStartUpload,
    handleUploadCancel,
    authState,
    inputDataState,
    referencesState,
    getReferences,
    updateRequireStatus,
    deleteReference,
    progress
  };
};

export default useUploadExecution;
