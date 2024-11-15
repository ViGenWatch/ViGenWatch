import React, { useEffect, useRef, useState } from 'react';
import style from './Start.module.scss';
import classNames from 'classnames/bind';
import LogoText from '../../components/Logo-Text';
import { IoMdArrowDropdown } from 'react-icons/io';
import { CiFileOn } from 'react-icons/ci';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Actions } from '../../redux/reducer/inputDataReducer';
import ItemReferenceSelected from './ItemReferenceSelected';
import useReferencesAuthority from '../../hook/authority/useReferencesAuthority';
import useReferences from '../../hook/useReferences';
import RunButton from '../RunButton';
import PropTypes from 'prop-types';

const cx = classNames.bind(style);

const StartComponent = (props) => {
  const { handleLoading } = props;
  const authState = useSelector((state) => state.auth);
  const { referencesState } = authState.user.role === '0x01' ? useReferences() : useReferencesAuthority();
  // const [toggle, setToggle] = useState(false);
  const [inputCategory, setInputCategory] = useState(1);
  const inputGroup1Ref = useRef(null);
  const inputGroup2Ref = useRef(null);
  const navigate = useNavigate();
  const inputDataState = useSelector((state) => state.inputData);
  const dispatch = useDispatch();

  useEffect(() => {
    const inputGroup1Height = inputGroup1Ref.current.scrollHeight;
    // const inputGroup2Height = inputGroup2Ref.current.scrollHeight;
    // const maxHeight = Math.max(inputGroup1Height, inputGroup2Height);
    inputGroup1Ref.current.style.height = `max-content`;
    inputGroup2Ref.current.style.height = `${inputGroup1Height - 15}px`;
  }, [inputDataState.inputFilesData]);

  const handleSequenceFileChange = (event) => {
    const files = Array.from(event.target.files);
    dispatch(Actions.setInputFilesData(files));
  };

  const selectSequenceClick = () => {
    document.getElementById('file-upload').click();
  };

  return (
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
          {inputDataState.inputFilesData.length > 0 && (
            <div className={cx('input-group__sequence-footer')}>
              <div className={cx('title-group')}>
                <span className={cx('subtitle1')}>Sequence file data.fasta</span>
                <span className={cx('subtitle2')}>Remove all</span>
              </div>
              <div className={cx('item-file-ls')}>
                {inputDataState.inputFilesData.map((file) => (
                  <div key={file.name} className={cx('item-file')}>
                    <CiFileOn fontSize='20px' color='#495057' />
                    <span>{file.name}</span>
                    <div style={{ flex: '1' }}></div>
                    <RiDeleteBin6Line
                      fontSize='25px'
                      color='rgb(33, 150, 243)'
                      cursor='pointer'
                      onClick={() => dispatch(Actions.removeInputFileData(file.name))}
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
            {/* <div className={cx('toggle-select')} style={{ display: 'none' }}>
                  <button className={cx('toggle-btn', { toggled: toggle })} onClick={() => setToggle(!toggle)}>
                    <span className={cx('thumb')}></span>
                  </button>
                  <span>Suggest automatically</span>
                </div> */}

            <button
              className={cx(
                inputDataState.selectedReferenceId !== null ? 'change-reference-group-active' : 'change-reference-group'
              )}
              onClick={() => {
                if (inputDataState.selectedReferenceId !== null) {
                  navigate('/reference');
                }
              }}
            >
              Change reference
            </button>

            <div className={cx('suggest-btn-group')}>
              <RunButton
                inputDataState={inputDataState}
                referencesState={referencesState}
                authState={authState}
                handleLoading={handleLoading}
              />
            </div>
          </div>

          {inputDataState.selectedReferenceId !== null ? (
            referencesState.references &&
            referencesState.references.length > 0 &&
            inputDataState.selectedReferenceId !== null && (
              <div className={cx('input-group__dataset-input')}>
                <ItemReferenceSelected
                  {...referencesState.references.find((element) => element.id === inputDataState.selectedReferenceId)}
                />
              </div>
            )
          ) : (
            <div className={cx('input-group__dataset-input')}>
              <button
                className={cx('select-btn')}
                onClick={() => {
                  navigate('/reference');
                }}
              >
                Select Reference Files
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

StartComponent.propTypes = {
  handleLoading: PropTypes.func.isRequired
};

export default StartComponent;
