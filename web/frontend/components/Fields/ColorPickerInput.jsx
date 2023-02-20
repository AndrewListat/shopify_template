/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Label, ColorPicker, TextField, Popover } from '@shopify/polaris';
import { findIndex } from 'lodash';
import classNames from 'classnames';
import { HEXToRGB, RGBtoHEX, RGBtoHSV, HSVtoRGB } from '../../lib/color';
import styles from './ColorPickerInput.module.scss';
import colors from '../../config/colors';

function ColorPickerInput({
  label,
  input,
  onChangeHandle = () => {},
  showGradient,
}) {
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );
  const [state, setState] = useState({
    active: false,
    valueHex: input.value,
    errorHex: false,
  });

  const handleChange = (color) => {
    const rgb = HSVtoRGB(color.hue / 360, color.saturation, color.brightness);
    let colorHex = RGBtoHEX(rgb);
    if (color.alpha < 1) {
      const alfa255 = Math.round(color.alpha * 255);
      colorHex += (alfa255 < 16 ? '0' : '') + alfa255.toString(16);
    }
    setState({ ...state, valueHex: colorHex, errorHex: false });
    input.onChange(colorHex);
    onChangeHandle(colorHex);
  };

  const validHex = (value) => {
    return Boolean(value.match(/^#([0-9A-F]{6}|[0-9A-F]{8})$/gim));
  };
  const _Ref = useRef();

  const handleClick = (event) => {
    if (_Ref && _Ref.current.contains(event.target)) {
      return;
    }
    setState({ ...state, active: false });
  };

  const handleChangeColor = (value) => {
    input.onChange(value);
    setState({ ...state, active: false, errorHex: false });
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick, false);
    return () => {
      document.removeEventListener('mousedown', handleClick, false);
    };
  }, []);

  let valueStyleBg = input.value;

  let start_color;
  if (valueStyleBg.indexOf('gradient_') > -1) {
    const index = findIndex(colors.gradients, ['name', valueStyleBg]);
    if (index > -1) {
      valueStyleBg = colors.gradients[index].style;
      start_color = colors.gradients[index].start_color;
    }
  }

  // eslint-disable-next-line id-length
  let hsl = { h: 0, s: 0, v: 0 };
  let alpha = 1;
  let colorHex = '#000000';
  if (input.value !== 'none') {
    const color = start_color || input.value;
    if (color.match(/^#[0-9a-f]{8}$/i)) {
      const alphaHEX = color.slice(-2);
      const alpha255 = parseInt(alphaHEX, 16);
      alpha = alpha255 / 255;
      colorHex = color.slice(0, -2);
    } else if (color.match(/^#[0-9a-f]{6}$/i)) {
      colorHex = color;
    }
    const rgb = HEXToRGB(colorHex);
    hsl = RGBtoHSV(rgb);
  } else {
    // eslint-disable-next-line id-length
    hsl.v = 1;
    alpha = 0;
  }

  state.valueHex = start_color || input.value;

  if (state.valueHex.length === 9 && state.valueHex.slice(-2) === '00') {
    valueStyleBg = 'none';
  }

  const activator = (
    <div
      className={classNames('ColorPickerInput-value', {
        none: valueStyleBg === 'none',
      })}
      onClick={togglePopoverActive}
      style={{ background: valueStyleBg || 'white' }}
    />
  );

  return (
    <div className={styles.ColorPickerInput}>
      <Label>{label}</Label>
      <div className="ColorPickerInput-color" ref={_Ref}>
        <Popover
          active={popoverActive}
          activator={activator}
          onClose={togglePopoverActive}
          preferredAlignment="left"
        >
          <Popover.Pane>
            <div className={styles.ColorPickerInput_block}>
              <div style={{}}>
                <div
                  style={{ padding: '16px', borderBottom: '1px solid #DFE3E8' }}
                >
                  <ColorPicker
                    onChange={handleChange}
                    allowAlpha
                    color={{
                      hue: hsl.h * 360,
                      brightness: hsl.v,
                      saturation: hsl.s,
                      alpha,
                    }}
                  />
                </div>
                <div className="ColorPickerInput-hax-input">
                  <TextField
                    value={state.valueHex}
                    onChange={(value) => {
                      if (validHex(value)) {
                        input.onChange(value);
                        onChangeHandle(value);
                        setState({
                          ...state,
                          errorHex: false,
                          valueHex: value,
                        });
                      } else {
                        setState({ ...state, errorHex: true, valueHex: value });
                      }
                    }}
                    error={state.errorHex}
                  />
                  <div className="label">hex</div>
                  <div
                    className="point"
                    style={{
                      background: start_color || input.value || 'white',
                    }}
                  />
                </div>
                <div className="ColorPickerInput-default">
                  {/* <div className="ColorPickerInput-default-title">
                    Recommended Colors
                  </div>
                  <div className="ColorPickerInput-default-items">
                    {colors.recommended
                      ? colors.recommended.map((item) => (
                        <div
                            key={`item-store-color-${item}`}
                            onClick={() => {
                              this.handleChangeColor(item);
                            }}
                            className="ColorPickerInput-default-item"
                            style={{ background: item }}
                          />
                        ))
                      : null}
                    <div
                      onClick={() => {
                        this.handleChangeColor(`${colorHex}00`);
                      }}
                      className="ColorPickerInput-default-item none"
                      style={{ background: 'none' }}
                    />
                  </div> */}
                  {showGradient && (
                    <div className="ColorPickerInput-default-title">
                      Gradients
                    </div>
                  )}
                  {showGradient && (
                    <div className="ColorPickerInput-default-items">
                      {colors.gradients
                        ? colors.gradients.map((item) => (
                          <div
                              key={`item-store-color-${item.name}`}
                              onClick={() => {
                                handleChangeColor(item.name);
                              }}
                              className="ColorPickerInput-default-item"
                              style={{ background: item.style }}
                            />
                          ))
                        : null}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Popover.Pane>
        </Popover>
        {/* {state.active ? (
          
        ) : null} */}
      </div>
    </div>
  );
}

export default ColorPickerInput;
