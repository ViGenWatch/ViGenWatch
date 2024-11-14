import React, { useState } from 'react';
import style from './FilterGroup.module.scss';
import classNames from 'classnames/bind';
import { IoIosArrowDown } from 'react-icons/io';
import PropTypes from 'prop-types';

const cx = classNames.bind(style);

const FilterGroup = (props) => {
  const { referenceFilterArray, handleClickFilter, optionFilter } = props;
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <div role='button' className={cx('filter-group')} onClick={() => setOpenFilter(!openFilter)}>
      <span className={cx('text-filter')}>{optionFilter.value}</span>
      <IoIosArrowDown />

      <div className={cx('bar-options')} style={{ display: openFilter ? 'flex' : 'none' }}>
        {referenceFilterArray.map((filter, index) => (
          <span role='button' key={index} onClick={() => handleClickFilter(index)}>
            {filter.value}
          </span>
        ))}
      </div>
    </div>
  );
};

FilterGroup.propTypes = {
  referenceFilterArray: PropTypes.array.isRequired,
  handleClickFilter: PropTypes.func.isRequired,
  optionFilter: PropTypes.object.isRequired
};

export default FilterGroup;
