import React, { useEffect, useRef, useState } from 'react';
import LayoutComponent from '../../components/layout';
import style from './start.module.scss';
import classNames from 'classnames/bind';
import LogoText from '../../components/logo-text';
import { IoMdArrowDropdown } from 'react-icons/io';
import { CiFileOn } from 'react-icons/ci';
import { RiDeleteBin6Line } from 'react-icons/ri';
import axios from 'axios';

const cx = classNames.bind(style);

const HomePage = () => {
  const [toggle, setToggle] = useState(false);
  const [inputCategory, setInputCategory] = useState(1);
  const [sequenceFile, setSequenceFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const inputGroup1Ref = useRef(null);
  const inputGroup2Ref = useRef(null);

  useEffect(() => {
    const inputGroup1Height = inputGroup1Ref.current.scrollHeight;
    const inputGroup2Height = inputGroup2Ref.current.scrollHeight;
    const maxHeight = Math.max(inputGroup1Height, inputGroup2Height);
    console.log(maxHeight);
    inputGroup1Ref.current.style.height = `max-content`;
    inputGroup2Ref.current.style.height = `${maxHeight - 15}px`;
  }, [sequenceFile]);

  const handleSequenceFileChange = (event) => {
    setSequenceFile(event.target.files[0]);
  };

  const selectSequenceClick = () => {
    document.getElementById('file-upload').click();
  };

  const handleUpload = async () => {
    if (!sequenceFile) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', sequenceFile);

    try {
      const response = await axios.post('http://localhost:5050/file/upload', formData, {
        withCredentials: true
      });

      if (response.status === 200) {
        setUploadStatus('Upload successful!');
      } else {
        setUploadStatus('Upload failed!');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Upload failed!');
    }
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
                <input type='file' id='file-upload' style={{ display: 'none' }} onChange={handleSequenceFileChange} />
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
            {sequenceFile && (
              <div className={cx('input-group__sequence-footer')}>
                <div className={cx('title-group')}>
                  <span className={cx('subtitle1')}>Sequence file data.fasta</span>
                  <span className={cx('subtitle2')}>Remove all</span>
                </div>
                <div className={cx('item-file-ls')}>
                  <div className={cx('item-file')}>
                    <CiFileOn fontSize='20px' color='#495057' />
                    <span>{sequenceFile.name}</span>
                    <div style={{ flex: '1' }}></div>
                    <RiDeleteBin6Line fontSize='25px' color='rgb(33, 150, 243)' cursor='pointer' />
                  </div>
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
