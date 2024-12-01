import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Actions } from '../redux/reducer/referencesReducer';
import { deleteReferenceFolder } from '../service/reference';
import { ActionsInputData } from '../redux/reducer/inputDataReducer';
import { useWebSocket } from './useWebSocket';

const useReferences = () => {
  const dispatch = useDispatch();
  const referencesState = useSelector((state) => state.references);
  const authState = useSelector((state) => state.auth);
  const inputDataState = useSelector((state) => state.inputData);
  const API_URL = 'http://localhost:5050';
  const filesRef = useRef([]);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(false);
  const sessionIdRef = useRef(null);
  const abortControllerRef = useRef(null);
  const { socket, connected } = useWebSocket('ws://localhost:5050');

  useEffect(() => {
    if (!referencesState.references) {
      getReferences();
    }
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.addEventListener('message', handleSocketMessage);
    return () => {
      socket.removeEventListener('message', handleSocketMessage);
    };
  }, [socket]);

  const handleLoading = (isLoading) => {
    setLoading(isLoading);
  };

  const handleSocketMessage = (event) => {
    const data = JSON.parse(event.data);
    console.log('WebSocket message received:', data);

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

  const handleFileSelect = (files) => {
    files.forEach((file) => {
      file.value && filesRef.current.push(file.value);
    });
  };

  const handleStartUpload = () => {
    console.log('Trước khi upload, files:', filesRef.current);

    if (!connected) {
      alert('Không có kết nối tới server');
      return;
    }

    if (filesRef.current.length === 0) {
      alert('Vui lòng chọn file để upload');
      return;
    }

    setLoading(true);
    setProgress(() => {
      const newProgress = {};
      for (let i = 0; i < filesRef.current.length; i++) {
        newProgress[i] = 0;
      }
      return newProgress;
    });
    abortControllerRef.current = new AbortController();

    socket.send(
      JSON.stringify({
        type: 'START_UPLOAD',
        files: filesRef.current.map((f) => ({
          name: f.name,
          size: f.size
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

            const promise = fetch(`${API_URL}/api/reference/create-reference`, {
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

      setLoading(false);
      filesRef.current = [];
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Upload bị hủy bởi người dùng');
      } else {
        console.error('Lỗi upload:', error);
      }
      setLoading(false);
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
      setLoading(false);
      setProgress({});
      sessionIdRef.current = null;
    }
  };

  const getReferences = () => {
    dispatch(Actions.getReferencesRequest());
  };

  const updateRequireStatus = (referenceId, status) => {
    dispatch(Actions.updateRequireStatusRequest({ referenceId, status }));
  };

  const deleteReference = async (referenceId) => {
    dispatch(ActionsInputData.removeSelectReference());
    await deleteReferenceFolder(referenceId);
    getReferences();
  };

  return {
    referencesState,
    getReferences,
    authState,
    inputDataState,
    updateRequireStatus,
    deleteReference,
    filesRef,
    progress,
    loading,
    handleFileSelect,
    handleStartUpload,
    handleLoading,
    sessionIdRef
  };
};

export default useReferences;
