import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Icon from './icon'


export default class Label extends Component {
  static propTypes = {
    type: PropTypes.string, /*Indicates the type of icon to display*/
    clickHandler: PropTypes.func
  }

  render() {
    // console.log("label type: ", this.props.type);
    return (
      //TODO: move Icon Componenet into here (to pass state of task easily) maybee
      <div className="label">
        <Icon type={this.props.type}/>
        {this.props.content}     
      </div>
    );
  }
}