import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Bullet from './bullet'

export default class List extends Component {
  static propTypes = {
    content: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    key: PropTypes.number,
    title: PropTypes.string,
    mode: PropTypes.string, /*Indicates list mode "allGroups" or "oneGroup"*/
    viewOneGroupHandler: PropTypes.func
  }

  constructor(props){
    super(props);

    this.setTaskType = this.setTaskType.bind(this);

    this.modeToType = {
      "allGroups": "group",
      "oneGroup": "incomplete"
    }

  }

  setTaskType(dependencies, completedAt){
    if( dependencies.length > 0) {
      return "locked"
    } else if (completedAt == null) {
      return "incomplete"
    } else {
      return "complete"
    }
  }
  
  render() {
    console.log("TG's: ", this.props.content);
    let items;
    if(this.props.mode === "allGroups") {
      items = Object.keys(this.props.content).map((taskName,i) => {
        return <Bullet
                clickHandler={this.props.viewOneGroupHandler}
                content={taskName}
                key={i}
                type={this.modeToType[this.props.mode]}
                
              />
      })
    } else if(this.props.mode === "oneGroup") {
      items = Object.values(this.props.content).map((taskName,i) => {
        let task = this.props.content[i];
        return <Bullet
                clickHandler={this.props.clickedTaskHandler}
                content={task.task}
                task={task}
                key={i}
                type={this.setTaskType(task.dependencyIds, task.completedAt)}
              />
      })
    }

    return (
      <div className="list">
        <h1>{this.props.title}</h1>
        {items}
      </div>
    );
  }
}