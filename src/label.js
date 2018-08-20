import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

export default class Label extends Component {
  static propTypes = {
    type: PropTypes.string, /*Indicates the type of icon to display*/
    clickHandler: PropTypes.func
  }

  render() {
    return (
      <div className="label">
        
        {this.props.content}
       
      </div>
    );
  }
}