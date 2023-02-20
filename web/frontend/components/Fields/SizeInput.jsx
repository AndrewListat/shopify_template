import React from 'react';
import { Label, TextField, InlineError } from '@shopify/polaris';
import classNames from 'classnames';
import styles from './SizeInput.module.scss';

const SizeInput = ({
  input,
  label,
  meta: { error, touched },
  className,
  eventName,
  symbol,
  onChangeHandle = () => {},
}) => {
  return (
    <div className={classNames(styles['SizeInput'], className)}>
      <div className="input-block">
        <Label>{label}</Label>
        <div className="input">
          <TextField
            value={input.value.toString()}
            onChange={(e) => {
              input.onChange(e);
              onChangeHandle(e);
            }}
            onBlur={input.onBlur}
            error={(touched && error) || null}
            autoComplete="off"
            type="number"
          />
          <div
            className={classNames('hint-text', {
              'is-error': touched && error,
            })}
          >
            {symbol}
          </div>
        </div>
      </div>
      {touched && error && <InlineError message={error} />}
    </div>
  );
};

export default SizeInput;
