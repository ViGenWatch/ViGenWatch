import React, { useEffect, useRef, useState } from 'react';
import LayoutComponent from '../../components/layout';
import style from './start.module.scss';
import classNames from 'classnames/bind';
import LogoText from '../../components/logo-text';
import { IoMdArrowDropdown } from 'react-icons/io';
import { CiFileOn } from 'react-icons/ci';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useSelector } from 'react-redux';

const cx = classNames.bind(style);

const HomePage = () => {
  const authState = useSelector((state) => state.auth);
  const [toggle, setToggle] = useState(false);
  const [inputCategory, setInputCategory] = useState(1);
  const [sequenceFiles, setSequenceFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');
  const inputGroup1Ref = useRef(null);
  const inputGroup2Ref = useRef(null);

  useEffect(() => {
    const inputGroup1Height = inputGroup1Ref.current.scrollHeight;
    // const inputGroup2Height = inputGroup2Ref.current.scrollHeight;
    // const maxHeight = Math.max(inputGroup1Height, inputGroup2Height);
    inputGroup1Ref.current.style.height = `max-content`;
    inputGroup2Ref.current.style.height = `${inputGroup1Height - 15}px`;
  }, [sequenceFiles]);

  const handleSequenceFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSequenceFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const selectSequenceClick = () => {
    document.getElementById('file-upload').click();
  };

  const handleUpload = async () => {
    if (sequenceFiles.length === 0) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('userId', authState.user.id);
    formData.append('userName', authState.user.userName);
    sequenceFiles.forEach((file) => {
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

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let result = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result += decoder.decode(value, { stream: true });
      }

      const data = JSON.parse(result);

      console.log('Response from server:', data);
      setUploadStatus('Upload successful!');
    } catch (error) {
      console.error('Error uploading files:', error);
      setUploadStatus('Upload failed!');
    }
  };

  const handleRemoveFile = (fileToRemove) => {
    setSequenceFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileToRemove));
  };

  return (
    <LayoutComponent>
      <div className={cx('section-start')}>
        <LogoText style={{ fontSize: '6rem', fontWeight: '300' }} />
        <span className={cx('subtitle')}>Clade assignment, mutation calling, and sequence quality checks</span>

        <div className={cx('input-group')}>
          <div ref={inputGroup1Ref} className={cx('input-group__sequence')}>
            <div className={cx('input-group__sequence-header')}>
              <span>Select File Sequence Data</span>
            </div>
            <div className={cx('input-group__sequence-category')}>
              <button
                className={cx(`input-${inputCategory === 1 ? 'current' : 'category'}`)}
                onClick={() => setInputCategory(1)}
              >
                <span>File</span>
              </button>

              <button
                className={cx(`input-${inputCategory === 2 ? 'current' : 'category'}`)}
                onClick={() => setInputCategory(2)}
              >
                <span>Text</span>
              </button>

              <button className={cx('input-category')}>
                <span>Example</span>
                <IoMdArrowDropdown />
              </button>
            </div>
            {inputCategory === 1 ? (
              <div className={cx('input-group__sequence-input-1')}>
                <input
                  type='file'
                  id='file-upload'
                  style={{ display: 'none' }}
                  onChange={handleSequenceFileChange}
                  multiple
                />
                <button className={cx('select-btn')} onClick={selectSequenceClick}>
                  Select Files
                </button>
              </div>
            ) : (
              <div className={cx('input-group__sequence-input-2')}>
                <span>Enter sequence data in FASTA format</span>
                <textarea className={cx('text-input')} />
                <div className={cx('submit-btn-group')}>
                  <span className={cx('reset-btn')}>Clear</span>
                  <button className={cx('btn-submit')}>OK</button>
                </div>
              </div>
            )}
            {sequenceFiles.length > 0 && (
              <div className={cx('input-group__sequence-footer')}>
                <div className={cx('title-group')}>
                  <span className={cx('subtitle1')}>Sequence file data.fasta</span>
                  <span className={cx('subtitle2')}>Remove all</span>
                </div>
                <div className={cx('item-file-ls')}>
                  {sequenceFiles.map((file) => (
                    <div key={file.name} className={cx('item-file')}>
                      <CiFileOn fontSize='20px' color='#495057' />
                      <span>{file.name}</span>
                      <div style={{ flex: '1' }}></div>
                      <RiDeleteBin6Line
                        fontSize='25px'
                        color='rgb(33, 150, 243)'
                        cursor='pointer'
                        onClick={() => handleRemoveFile(file.name)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div ref={inputGroup2Ref} className={cx('input-group__dataset')}>
            <div className={cx('input-group__dataset-header')}>
              <span>Select File Reference Dataset</span>
            </div>
            <div className={cx('input-group__dataset-suggest')}>
              <div className={cx('toggle-select')}>
                <button className={cx('toggle-btn', { toggled: toggle })} onClick={() => setToggle(!toggle)}>
                  <span className={cx('thumb')}></span>
                </button>
                <span>Suggest automatically</span>
              </div>

              <div className={cx('suggest-btn-group')}>
                <span>Reset</span>
                <button className={cx('suggest-btn-group__btn')} onClick={handleUpload}>
                  Suggest
                </button>
                <span>{uploadStatus}</span>
              </div>
            </div>

            <div className={cx('input-group__dataset-input')}>
              <button className={cx('select-btn')}>Select Reference Files</button>
            </div>
          </div>
        </div>
      </div>
    </LayoutComponent>
  );
};

export default HomePage;
