/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import classNames from 'classnames';
import { findIndex } from 'lodash';
import { Icon } from '@shopify/polaris';
import { SelectMinor } from '@shopify/polaris-icons';
import styles from './CustomDropDown.module.scss';

class CustomDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
    this._Ref = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick = (event) => {
    if (this._Ref && this._Ref.current.contains(event.target)) {
      return;
    }
    this.setState({ active: false });
  };

  togglePopover = (value) => {
    this.setState(({ active }) => {
      return { active: !active };
    });
  };

  render() {
    const {
      options,
      input,
      classNameInputValue,
      onChangeHandle = () => {},
    } = this.props;

    const indexValue =
      options && Array.isArray(options)
        ? findIndex(options, ['value', input.value])
        : -1;

    return (
      <div
        className={styles['CustomDropDown']}
        ref={this._Ref}
        onClick={input.onClick}
      >
        <div
          className={classNames('CustomDropDown-Input', {
            active: this.state.active,
          })}
          onClick={this.togglePopover}
        >
          <div
            className={classNames(
              'Polaris-Select__SelectedOption',
              classNameInputValue
            )}
          >
            {indexValue > -1 ? options[indexValue].title : null}
          </div>
          <Icon color="inkLighter" source={SelectMinor} />
        </div>
        {this.state.active ? (
          <div className="drop-wrapper">
            {options && Array.isArray(options)
              ? options.map((item) => (
                  <div
                    key={`drop-item-${item.value}`}
                    className={classNames(item.className, 'drop-item-option', {
                      active: input.value === item.value,
                    })}
                    onClick={() => {
                      input.onChange(item.value);
                      onChangeHandle(item.value);
                      this.togglePopover(item.value);
                    }}
                  >
                    {item.title}
                  </div>
                ))
              : null}
          </div>
        ) : null}
      </div>
    );
  }
}

export default CustomDropDown;
