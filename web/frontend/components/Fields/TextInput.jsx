/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { TextField } from '@shopify/polaris';
import classNames from 'classnames';
import styles from './TextInput.module.scss';

const TextInput = ({
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
}) => {
  return (
    <div className={classNames(styles.TextInput, className)} style={style}>
      <TextField
        {...inputProps}
        label={label}
        disabled={disabled}
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
        multiline={multiline}
        align={align}
        error={(!disabled && touched && error) || null}
      />
    </div>
  );
};

export default TextInput;
