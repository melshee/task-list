import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Icon from './icon'
import Label from './label'

export default class Bullet extends Component {
  static propTypes = {
    type: PropTypes.string, /*Indicates the type of icon to display*/
    clickHandler: PropTypes.func
    // content: 
  }

  render() {
    return (
      <div className="bullet">
        <Icon type={this.props.type}/>
        <Label content={this.props.content} clickHandler={this.props.clickHandler}/>
      </div>
    );
  }
}
