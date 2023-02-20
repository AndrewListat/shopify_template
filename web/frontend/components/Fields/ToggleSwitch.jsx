import classNames from 'classnames';
import React from 'react';
import Switch from 'react-switch';
import styles from './ToggleSwitch.module.scss';

const HnadleIcon = () => (
  <div
    style={{
      marginTop: 2,
      marginLeft: 2,
      height: 16,
      width: 16,
      background: 'white',
      borderRadius: '50%',
    }}
  />
);

const ToggleSwitch = ({ value, onChange }) => {
  return (
    <div
      className={classNames(styles.ToggleSwitch, { [styles.active]: value })}
    >
      <Switch
        height={22}
        uncheckedIcon={false}
        checkedIcon={false}
        width={36}
        onChange={onChange}
        checked={value}
        offColor="#D8D3CE"
        onColor="#ff9f85"
        uncheckedHandleIcon={<HnadleIcon />}
        checkedHandleIcon={<HnadleIcon />}
      />
    </div>
  );
};

export default ToggleSwitch;
