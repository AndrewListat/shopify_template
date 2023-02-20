import { Label } from '@shopify/polaris';
import classNames from 'classnames';
import React from 'react';
import { useSelector } from 'react-redux';
import Blocked from '../../../../../../../Blocked/Blocked';
import styles from './PositionField.module.scss';

function PositionField({ label, input, isMobile, onChangeHandle = () => {} }) {
  const shop = useSelector((state) => state.shop.data);
  return (
    <div className={styles.PositionField}>
      {label && <Label>{label}</Label>}
      <div className={styles.items}>
        <div
          className={classNames(styles.item, styles.left, {
            [styles.active]: input.value == 'left',
          })}
          onClick={() => {
            input.onChange('left');
            onChangeHandle('left');
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className={styles.logo} />
            <div className={styles.text}>Text</div>
          </div>
          <div className={styles.btn} />
        </div>

        <div
          className={classNames(styles.item, styles.center, {
            [styles.active]: input.value == 'center',
          })}
          onClick={() => {
            input.onChange('center');
            onChangeHandle('center');
          }}
        >
          <div className={styles.logo} />
          <div className={styles.text}>Text</div>
          <div className={styles.btn} />
        </div>
        <div
          className={classNames(styles.item, styles.space_between, {
            [styles.active]: input.value == 'space_between',
          })}
          onClick={() => {
            input.onChange('space_between');
            onChangeHandle('space_between');
          }}
        >
          <div className={styles.logo} />
          <div className={styles.text}>Text</div>
          <div className={styles.btn} />
        </div>
      </div>
    </div>
  );
}

export default PositionField;
