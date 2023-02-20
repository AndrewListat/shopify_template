/* eslint-disable camelcase */
/* eslint-disable no-undef */
import React, { Component } from 'react';
import { Label, ColorPicker, TextField } from '@shopify/polaris';
import { findIndex } from 'lodash';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { HEXToRGB, RGBtoHEX, RGBtoHSV, HSVtoRGB } from '../../lib/color';
import './ColorPickerInput.scss';
import config from '../../redux/config';

const { colors } = config;

class ColorPickerInput extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      active: false,
      valueHex: this.props.input.value,
      errorHex: false,
    };

    if (this.props.input.value.indexOf('gradient_') > -1) {
      const index = findIndex(colors.gradients, [
        'name',
        this.props.input.value,
      ]);
      if (index > -1) {
        this.state.valueHex = colors.gradients[index].start_color;
      }
    }

    this._Ref = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick = (event) => {
    const { handleClick, handleOutsideClick } = this.props;
    if (this._Ref && this._Ref.current.contains(event.target)) {
      handleClick && handleClick();
      return;
    }
    handleOutsideClick && handleOutsideClick();
    this.setState({ active: false });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.input.value.indexOf('gradient_') > -1) {
      const index = findIndex(colors.gradients, [
        'name',
        nextProps.input.value,
      ]);
      if (index > -1) {
        this.setState({ valueHex: colors.gradients[index].start_color });
      }
    } else {
      this.setState({ valueHex: nextProps.input.value });
    }
  }

  handleChange = (color) => {
    const rgb = HSVtoRGB(color.hue / 360, color.saturation, color.brightness);
    let colorHex = RGBtoHEX(rgb);
    if (color.alpha < 1) {
      const alfa255 = Math.round(color.alpha * 255);
      colorHex += (alfa255 < 16 ? '0' : '') + alfa255.toString(16);
    }
    this.setState({ errorHex: false });
    this.props.input.onChange(colorHex);
  };

  handleChangeColor = (value) => {
    this.props.input.onChange(value);
    this.setState({ active: false, errorHex: false });
  };

  validHex = (value) => {
    return Boolean(value.match(/^#([0-9A-F]{6}|[0-9A-F]{8})$/gim));
  };

  render() {
    const { label, input, className, eventName } = this.props;

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

    // this.state.valueHex = start_color || input.value;

    if (
      this.state.valueHex.length === 9 &&
      this.state.valueHex.slice(-2) === '00'
    ) {
      valueStyleBg = 'none';
    }

    return (
      <div className={classNames('ColorPickerInput', className)}>
        <Label>{label}</Label>
        <div className="ColorPickerInput-color" ref={this._Ref}>
          <div
            className={classNames('ColorPickerInput-value', {
              none: valueStyleBg === 'none',
            })}
            onClick={() => {
              this.setState({ active: true });
              if (eventName) {
                amplitude.logEvent(eventName);
              }
            }}
            style={{ background: valueStyleBg || 'white' }}
          />
          {this.state.active ? (
            <div className="ColorPickerInput-block">
              <div style={{}}>
                <div
                  style={{ padding: '16px', borderBottom: '1px solid #DFE3E8' }}
                >
                  <ColorPicker
                    onChange={this.handleChange}
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
                    value={this.state.valueHex}
                    onChange={(value) => {
                      if (this.validHex(value)) {
                        this.props.input.onChange(value);
                        this.setState({ errorHex: false, valueHex: value });
                      } else {
                        this.setState({ errorHex: true, valueHex: value });
                      }
                    }}
                    error={this.state.errorHex}
                  />
                  <div className="label">hex</div>
                  <div
                    className="point"
                    style={{
                      background: start_color || input.value || 'white',
                    }}
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  theme_colors: state.settings.data.theme_colors || [],
});

const mapDispatchToProps = {
  //
};

export default connect(mapStateToProps, mapDispatchToProps)(ColorPickerInput);
