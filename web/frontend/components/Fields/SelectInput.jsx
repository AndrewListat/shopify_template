/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Select } from '@shopify/polaris';
import classNames from 'classnames';
import styles from './SelectInput.module.scss';

const SelectInput = ({
  label,
  style,
  onChangeHandle = () => {},
  align,
  inputProps,
  input,
  multiline,
  disabled,
  placeholder,
  className,
  meta: { error, touched },
  handleBlur,
  handleFocus,
  options = [],
}) => {
  return (
    <div className={classNames(styles.SelectInput, className)} style={style}>
      <Select
        {...inputProps}
        label={label}
        disabled={disabled}
        options={options}
        // eslint-disable-next-line no-nested-ternary
        value={
          disabled ? '' : input.value ? input.value.toString() : input.value
        }
        onChange={(event) => {
          input.onChange(event);
          onChangeHandle(event);
        }}
        placeholder={disabled ? '' : placeholder}
        onBlur={(event) => {
          if (handleBlur) {
            handleBlur(event, input);
          }
          if (input.onBlur) {
            input.onBlur(event);
          }
        }}
        onFocus={(event) => {
          if (handleFocus) {
            handleFocus(event);
          }
        }}
        error={(!disabled && touched && error) || null}
      />
    </div>
  );
};

export default SelectInput;
