import React from 'react';
import style from './styles.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

const App = () => {
  return <div className={cx('app')}>Hello Anh Khai Nhe !</div>;
};

export default App;
