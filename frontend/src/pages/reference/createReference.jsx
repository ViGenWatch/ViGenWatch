import React, { useState } from 'react';
import style from './reference.module.scss';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const cx = classNames.bind(style);

const CreateReference = (props) => {
  const [clickChange, setClickChange] = useState(1);
  const authState = useSelector((state) => state.auth);
  const { user } = authState;
  const [formDataState, setFormData] = useState({
    folderName: '',
    referenceName: '',
    definition: '',
    author: '',
    version: '',
    link: '',
    status: false,
    require: false
  });

  const [files, setFile] = useState([
    {
      label: 'Auspice Config file.json',
      key: 'auspiceConfig',
      isDragging: false,
      value: null
    },
    {
      label: 'Colors file.tsv(txt)',
      key: 'colors',
      isDragging: false,
      value: null
    },
    {
      label: 'Dropped Trains file.tsv(txt)',
      key: 'droppedTrains',
      isDragging: false,
      value: null
    },
    {
      label: 'Lat Longs file.tsv(txt)',
      key: 'latLongs',
      isDragging: false,
      value: null
    },
    {
      label: 'Virus Outgroup file.gb',
      key: 'virusOutgroup',
      isDragging: false,
      value: null
    }
  ]);

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setFile((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles[index] = {
        ...newFiles[index],
        isDragging: true
      };
      return newFiles;
    });
  };

  const handleDragLeave = (e, index) => {
    e.preventDefault();
    setFile((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles[index] = { ...newFiles[index], isDragging: false };
      return newFiles;
    });
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile((prevFiles) => {
        const newFiles = [...prevFiles];
        newFiles[index] = {
          ...newFiles[index],
          value: droppedFile,
          isDragging: false
        };
        return newFiles;
      });
    }
  };

  const handleRemoveFile = (e, index) => {
    e.preventDefault();
    setFile((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles[index] = {
        ...newFiles[index],
        value: null
      };
      return newFiles;
    });
  };

  const handleFileInputChange = (e, index) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile((prevFiles) => {
        const newFiles = [...prevFiles];
        newFiles[index] = {
          ...newFiles[index],
          value: selectedFile,
          isDragging: false
        };
        return newFiles;
      });
    }
  };

  const handleButtonClick = (key) => {
    document.getElementById(key).click();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formDataState,
      [name]: value
    });
  };

  const handleCreateNewReference = async () => {
    props.handleLoading(true);
    const formData = new FormData();
    Object.entries(formDataState).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append('userId', user.id);
    files.forEach((file) => {
      formData.append('files', file.value);
    });
    try {
      const response = await fetch('http://localhost:5050/api/reference/create-reference/', {
        method: 'POST',
        body: formData
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      props.closeModal();
      props.getNewState();
      setTimeout(() => {
        props.handleLoading(false);
      }, 750);
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  return (
    <div className={cx('add-reference-group')}>
      <div className={cx('add-reference-group__header-group')}>
        <span className={cx('header-title')}>Create Reference Folder</span>
        <button className={cx('create-new-config')} onClick={handleCreateNewReference}>
          Create Reference Folder
        </button>
      </div>
      <div className={cx('add-reference-group__btn-change')}>
        <button
          className={cx('btn-infor', clickChange === 1 ? 'btn-change_active' : 'btn-change_unactive')}
          onClick={() => setClickChange(1)}
        >
          Reference Information
        </button>
        <button
          className={cx('btn-upload', clickChange === 2 ? 'btn-change_active' : 'btn-change_unactive')}
          onClick={() => setClickChange(2)}
        >
          Upload Reference Files
        </button>
      </div>
      <div className={cx('form-reference-infor')}>
        {clickChange === 1 ? (
          <form className={cx('form-container')}>
            <div className={cx('form-group')}>
              <label htmlFor='referenceName'>Folder Name</label>
              <input
                type='text'
                id='folderName'
                name='folderName'
                value={formDataState.folderName}
                onChange={handleChange}
              />
            </div>
            <div className={cx('form-group')}>
              <label htmlFor='referenceName'>Reference Name</label>
              <input
                type='text'
                id='referenceName'
                name='referenceName'
                value={formDataState.referenceName}
                onChange={handleChange}
              />
            </div>

            <div className={cx('form-group')}>
              <label htmlFor='definition'>Definition</label>
              <input
                type='text'
                id='definition'
                name='definition'
                value={formDataState.definition}
                onChange={handleChange}
              />
            </div>

            <div className={cx('form-group')}>
              <label htmlFor='author'>Author</label>
              <input type='text' id='author' name='author' value={formDataState.author} onChange={handleChange} />
            </div>

            <div className={cx('form-group')}>
              <label htmlFor='version'>Version</label>
              <input type='text' id='version' name='version' value={formDataState.version} onChange={handleChange} />
            </div>

            <div className={cx('form-group')}>
              <label htmlFor='link'>Link Paper</label>
              <input type='text' id='link' name='link' value={formDataState.link} onChange={handleChange} />
            </div>

            <div className={cx('form-group')}>
              <label htmlFor='require'>Status</label>
              <select
                className={cx('select')}
                id='require'
                name='require'
                value={formDataState.require}
                onChange={handleChange}
              >
                <option value={true}>Public</option>
                <option value={false}>Private</option>
              </select>
            </div>
          </form>
        ) : (
          <div className={cx('form-upload-container')}>
            {files.map((file, index) => (
              <div key={file.key} className={cx('form-group')}>
                <span className={cx('title')}>{file.label}</span>
                <div className={cx('select-file-form')}>
                  <div
                    className={cx('drop-zone', file.isDragging ? 'dragging' : file.value && 'have-file')}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragLeave={(e) => handleDragLeave(e, index)}
                    onDrop={(e) => handleDrop(e, index)}
                  >
                    <input
                      type='file'
                      onChange={(e) => handleFileInputChange(e, index)}
                      style={{ display: 'none' }}
                      id={file.key}
                    />
                    <label htmlFor='fileInput' className={cx(!file.isDragging ? 'file-input-label' : 'dragging-label')}>
                      {file.isDragging ? 'Drop it!' : file.value ? file.value.name : 'Drag & drop a file'}
                    </label>

                    <button
                      onClick={(e) => {
                        file.value ? handleRemoveFile(e, index) : handleButtonClick(file.key);
                      }}
                      style={{
                        display: file.isDragging ? 'none' : 'flex',
                        background: file.value && '#ffffff',
                        color: file.value && '#495057',
                        boxShadow: file.value && '0 1px 4px rgba(0, 0, 0, .4)'
                      }}
                      className={cx('btn-select-file')}
                    >
                      {file.value ? 'Remove' : 'Select a file'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

CreateReference.propTypes = {
  getNewState: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  handleLoading: PropTypes.func.isRequired
};

export default CreateReference;
