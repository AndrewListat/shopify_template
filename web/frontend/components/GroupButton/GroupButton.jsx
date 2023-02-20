/* eslint-disable react/no-array-index-key */
import { Button } from '@shopify/polaris';
import classNames from 'classnames';
import React from 'react';
import styles from './style.module.scss';

function GroupButton({ options, style, className }) {
  return (
    <div className={classNames(className, styles.GroupButton)} style={style}>
      {options.map((_i, index) => (
        <Button
          key={index}
          icon={_i.icon}
          fullWidth
          onClick={_i.onClick}
          primary={_i.active}
        >
          {_i.title}
        </Button>
      ))}

      {/* <Button icon={<Edit/>} primary fullWidth>Statistics</Button> */}
    </div>
  );
}

export default GroupButton;
