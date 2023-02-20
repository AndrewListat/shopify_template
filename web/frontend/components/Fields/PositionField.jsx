import { Label } from '@shopify/polaris';
import classNames from 'classnames';
import React from 'react';
import { useSelector } from 'react-redux';
import Blocked from '../../containers/Blocked/Blocked';
import styles from './PositionField.module.scss';

function PositionField({ label, input, isMobile }) {
  const shop = useSelector((state) => state.shop.data);
  return (
    <div className={styles.PositionField}>
      {label && <Label>{label}</Label>}
      <div className={styles.items}>
        {shop.pricing_plan == 'Free' && !isMobile && (
          <div className={styles.block}>
            <Blocked />
          </div>
        )}
        <div
          className={classNames(styles.item, styles.right, {
            [styles.active]: input.value == 'right',
          })}
          onClick={() => input.onChange('right')}
        >
          <div />
        </div>

        <div
          className={classNames(styles.item, styles.left, {
            [styles.active]: input.value == 'left',
          })}
          onClick={() => input.onChange('left')}
        >
          <div />
        </div>
        <div
          className={classNames(styles.item, styles.bottom_right, {
            [styles.active]: input.value == 'bottom_right',
          })}
          onClick={() => input.onChange('bottom_right')}
        >
          <div />
        </div>
        <div
          className={classNames(styles.item, styles.bottom_left, {
            [styles.active]: input.value == 'bottom_left',
          })}
          onClick={() => input.onChange('bottom_left')}
        >
          <div />
        </div>
      </div>
    </div>
  );
}

export default PositionField;
