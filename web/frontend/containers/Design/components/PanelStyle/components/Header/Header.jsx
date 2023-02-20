import classNames from 'classnames';
import React from 'react';
import styles from './style.module.scss';

function Header({ activeTab = 1, setActiveTab = () => {}, tabs = [] }) {
  return (
    <div className={styles.Header}>
      {tabs.map((_i, index) => (
        <div
          key={_i.title}
          className={classNames(styles.item, {
            [styles.active]: activeTab == _i.indexTab,
          })}
          onClick={() => setActiveTab(_i.indexTab)}
        >
          <div className={styles.icon}>{index + 1}</div>
          <div className={styles.text}>{_i.title}</div>
        </div>
      ))}
    </div>
  );
}

export default Header;
