import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moveFocusInside, { focusInside } from 'focus-lock';

export default class MoveFocusInside extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    disabled: false,
  }

  componentDidMount() {
    this.moveFocus();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.disabled && !this.props.disabled) {
      this.moveFocus();
    }
  }

  setObserveNode = (ref) => {
    this.observed = ref;
    this.moveFocus();
  };

  moveFocus() {
    const observed = this.observed;
    if (!this.props.disabled && observed) {
      if (!focusInside(observed)) {
        moveFocusInside(observed, null);
      }
    }
  }

  render() {
    const { children, disabled } = this.props;
    return (
      <div data-autofocus-inside={!disabled} ref={this.setObserveNode}>
        {children}
      </div>
    );
  }
}
