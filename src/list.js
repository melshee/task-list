import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Bullet from './bullet'

export default class List extends Component {
  static propTypes = {
    content: PropTypes.object,
    key: PropTypes.number,
    title: PropTypes.string,
    mode: PropTypes.string, /*Indicates list mode "allGroups" or "oneGroup"*/
    viewOneGroupHandler: PropTypes.func
  }

  constructor(props){
    super(props);

    this.modeToType = {
      "allGroups": "group",
      "oneGroup": "incomplete"
    }
  }
  
  render() {
    console.log("TG's: ", this.props.content);
    let items;
    if(this.props.mode === "allGroups") {
      items = Object.keys(this.props.content).map((taskName,i) => {
        return <Bullet
                content={taskName}
                key={i}
                type={this.modeToType[this.props.mode]}
                clickHandler={this.props.viewOneGroupHandler}
              />
      })
    } else if(this.props.mode === "oneGroup") {
      items = 
              <Bullet
                content={"individual task"}
                // key={i}
                type={"incomplete"}
              />
    }

    return (
      <div className="list">
        <h1>{this.props.title}</h1>
        {items}
      </div>
    );
  }
}