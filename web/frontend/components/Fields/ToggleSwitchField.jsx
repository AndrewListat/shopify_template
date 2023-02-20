import { Label } from '@shopify/polaris';
import React from 'react';
import ToggleSwitch from './ToggleSwitch';
import styles from './ToggleSwitch.module.scss';

const ToggleSwitchField = ({
  input,
  label,
  style,
  onChangeHandle = () => {},
}) => {
  return (
    <div
      className={styles.ToggleSwitchField}
      style={style}
      onClick={(e) => e.stopPropagation()}
    >
      {label && <Label>{label}</Label>}
      <ToggleSwitch
        value={input.value}
        onChange={(e) => {
          const tmp = !input.value;
          input.onChange(Boolean(tmp));
          onChangeHandle(Boolean(tmp));
        }}
      />
    </div>
  );
};

export default ToggleSwitchField;
