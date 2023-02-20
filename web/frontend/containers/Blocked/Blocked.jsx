import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './style.module.scss';
import Lock from '../../assets/icons/lock.svg';

function Blocked({ blur }) {
  const dispatch = useDispatch();
  return (
    <div
      className={styles.Blocked}
      onClick={() => {
        dispatch({ type: 'SET_SHOP_KEY', key: 'showPlans', data: true });
      }}
      style={{
        backdropFilter: blur ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: blur ? 'blur(16px)' : 'none',
      }}
    >
      <Lock />
    </div>
  );
}

export default Blocked;
