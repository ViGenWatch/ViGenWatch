import React, { useState, useEffect, useRef } from 'react';
import { useWebSocket } from '../../hook/useWebSocket';

const FileUploader = () => {
  const API_URL = 'http://localhost:5050';
  const [files, setFiles] = useState([]);
  const filesRef = useRef([]);
  const [progress, setProgress] = useState({});
  const [uploading, setUploading] = useState(false);
  const sessionIdRef = useRef(null);
  const abortControllerRef = useRef(null);

  const { socket, connected } = useWebSocket('ws://localhost:5050');

  useEffect(() => {
    if (!socket) return;

    socket.addEventListener('message', handleSocketMessage);
    return () => {
      socket.removeEventListener('message', handleSocketMessage);
    };
  }, [socket]);

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
          [data.fileIndex]: data.progress
        }));
        break;

      case 'FILE_COMPLETED': {
        setProgress((prev) => {
          const newProgress = { ...prev };
          delete newProgress[data.fileIndex];
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

  const handleFileSelect = (event) => {
    const selectedFiles = event.target.files;
    if (selectedFiles.length > 0) {
      const fileArray = Array.from(selectedFiles);
      setFiles(fileArray);
      filesRef.current = fileArray;
    }
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

    setUploading(true);
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

            const promise = fetch(`${API_URL}/hehe/upload`, {
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

      setUploading(false);
      setFiles([]);
      filesRef.current = [];
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Upload bị hủy bởi người dùng');
      } else {
        console.error('Lỗi upload:', error);
      }
      setUploading(false);
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
      setUploading(false);
      setProgress({});
      sessionIdRef.current = null;
    }
  };

  return (
    <div>
      <div className='flex gap-4 items-center'>
        <input type='file' multiple onChange={handleFileSelect} disabled={uploading} />

        <button
          onClick={handleStartUpload}
          disabled={uploading || files.length === 0}
          className='px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300'
        >
          Upload Files
        </button>

        {uploading && (
          <button onClick={handleUploadCancel} className='px-4 py-2 bg-red-500 text-white rounded'>
            Hủy Upload
          </button>
        )}
      </div>

      {files.length > 0 && !uploading && (
        <div className='mt-4'>
          <h3>Selected Files:</h3>
          {files.map((file, index) => (
            <div key={index} className='text-sm'>
              {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </div>
          ))}
        </div>
      )}

      {Object.entries(progress).map(([fileIndex, percent]) => (
        <div key={fileIndex} className='mt-4'>
          <p>
            File {files[fileIndex]?.name}: {percent.toFixed(1)}%
          </p>
          <div className='w-full h-2 bg-gray-200 rounded'>
            <div className='h-full bg-blue-500 rounded' style={{ width: `${percent}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FileUploader;
