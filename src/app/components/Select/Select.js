import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { ChevronDown } from '@icons/Chevron';
import { XMark } from '@icons/Mark';

class Select extends Component {
  static propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    value: '',
    placeholder: 'Select...',
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      open: false,
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', event => {
      if (this.node.contains(event.target)) {
        return;
      }

      this.close();
    });
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.close);
  }

  shouldComponentUpdate(previousProps, previousState) {
    return (
      previousState.value !== this.state.value ||
      previousState.open !== this.state.open ||
      previousProps.className !== this.props.className
    );
  }

  clear = event => {
    event.stopPropagation();
    this.setState(() => ({ value: '' }));
  };

  close = () => this.setState(() => ({ open: false }));

  toggle = () =>
    this.setState(previousState => ({ open: !previousState.open }));

  select = (event, value) => {
    this.setState(() => ({ value }));
    this.close();
    this.props.onChange && this.props.onChange(value);
  };

  get value() {
    return this.state.value;
  }

  render = () => (
    <div className={this.props.className} ref={node => (this.node = node)}>
      <div data-input onClick={this.toggle}>
        {this.state.value ? (
          <Fragment>
            <span data-value>{this.state.value}</span>
            <span data-close onClick={this.clear}>
              <XMark size="16" />
            </span>
          </Fragment>
        ) : (
          <span data-placeholder>{this.props.placeholder}</span>
        )}
        <ChevronDown size="14" />
      </div>
      {this.state.open ? (
        <div data-options>
          <div
            data-option
            role="option"
            onClick={event => this.select(event, 'Option 1')}
          >
            Option 1
          </div>
          <div
            data-option
            role="option"
            onClick={event => this.select(event, 'Option 2')}
          >
            Option 2
          </div>
          <div
            data-option
            role="option"
            onClick={event => this.select(event, 'Option 3')}
          >
            Option 3
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Select;