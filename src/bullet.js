import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
// import Icon from './icon'
import Label from './label'

export default class Bullet extends Component {
  static propTypes = {
    type: PropTypes.string, /*Indicates the type of icon to display*/
    clickHandler: PropTypes.func
    // content: 
  }

  render() {
    let bullet;
    if(this.props.type === "group") {
      bullet = //render taskGroup bullet
        <button type="button" onClick={() => this.props.clickHandler(this.props.content)}>         
          <Label type={this.props.type} content={this.props.content}/>
        </button>
    } else {
      // console.log("group: ", this.props.task.group);
      // console.log("id: ", this.props.task.id);
      bullet = //render task bullet
        <button type="button" onClick={() => this.props.clickHandler(this.props.task.group, this.props.type, this.props.task.id)}>         
          <Label type={this.props.type} content={this.props.content}/>
        </button>
    }
    return (
      <div className="bullet">
        {bullet}
      </div>
    );
  }
}
