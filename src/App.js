import React, { Component } from 'react';
import './App.css';
import List from './list'
import {data} from './data.js'

export default class App extends Component {
  constructor(props){
    super(props);

    this.hashIntoGroups = this.hashIntoGroups.bind(this);
    this.viewOneGroupHandler = this.viewOneGroupHandler.bind(this);
    this.viewAllGroupsHandler = this.viewAllGroupsHandler.bind(this);
    this.clickedTaskHandler = this.clickedTaskHandler.bind(this);
    this.getOneGroup = this.getOneGroup.bind(this);
    this.updateDependencies = this.updateDependencies.bind(this);
    this.calcTaskStatus = this.calcTaskStatus.bind(this)

    this.state = {
      mode: "allGroups", /*"allGroups", "oneGroup" */
      tasks: {},
      allTasks: {}
    }

    this.taskType = { //to map this.props.type to image
      "locked": "locked",
      "incomplete": "complete",
      "complete": "incomplete",
      //how to get to locked??
    }
  }

  hashIntoGroups(){
    let groupHash = {};
    let groupName;
    for(let i = 0; i < data.length; i++) {
      data[i]["completedIds"] = [] 
      groupName = data[i].group;
      if(groupHash[groupName] === undefined) {
        groupHash[groupName] = [];
      }
      groupHash[groupName].push(data[i]);
    }
    return groupHash;
  }

  getOneGroup(groupName){
    return this.state.allTasks[groupName];
  }

  componentDidMount(){
    this.setState({
      allTasks: this.hashIntoGroups()
    })
  }

  viewOneGroupHandler(groupName){
    let groupData = this.getOneGroup(groupName)
    this.setState({
      mode: "oneGroup",
      tasks: groupData
    });
  }

  viewAllGroupsHandler(){
    this.setState({
      mode: "allGroups"
    });
  }

  clickedTaskHandler(group, type, id) {
    // let groupData = this.getOneGroup(group);
    this.setState( prevState => {
        let index = prevState.tasks.findIndex(t => {return t.id === id});
        prevState.tasks[index] = this.calcTaskStatus(prevState.tasks[index], type);
        return prevState;
    })
    //update tasks
  }

  updateDependencies(action, id) {
    if(action === "remove") {
      Object.values(this.state.allTasks).forEach((taskGroup) => {
        Object.values(taskGroup).forEach((task) => {
          let dependencies = task.dependencyIds;
          let dependency = dependencies.indexOf(id);
          if(dependency >= 0) {
            let t = dependencies.splice(dependency,1); //remove the completed task's id from other tasks
            task.completedIds.push(t[0]);
          }
        });
      });
    } else if(action === "add") {
      Object.values(this.state.allTasks).forEach((taskGroup) => {
        Object.values(taskGroup).forEach((task) => {
          let dependency = task.completedIds.indexOf(id);
          if(dependency !== -1) {
            let t = task.completedIds.splice(dependency,1); //remove the completed task's id from other tasks
            task.dependencyIds.push(t[0]);
          }
        });
      });
    }
  }

  calcTaskStatus(task, type){
    if(task.dependencyIds.length > 0) {  //task is locked, should stay the same
      console.log("still locked, no change");
    } else if(type === "incomplete" && task.dependencyIds.length === 0 && task.completedAt == null) { //task is incomplete, switch to complete state
      console.log("incomplete -> complete");
      task.completedAt = new Date().toLocaleString();
      this.updateDependencies("remove", task.id);
    } else if(type === "complete" && task.completedAt != null) { //task is complete, switch to incomplete state?
      console.log("complete -> incomplete");
      task.completedAt = null;
      this.updateDependencies("add", task.id);
    } else {
      console.log("unexpected state - probably a bug")
    }
    return task;
  }

  render() {
    let backBtn = this.state.mode === "oneGroup" ? <button type="button" id="back-btn" onClick={this.viewAllGroupsHandler}>Back to All Groups</button> : null 
    let content = this.state.mode === "oneGroup" ? this.state.tasks : this.state.allTasks;
    return (
      <div className="app">
        <header className="app-header">
          <h2 className="app-title">Task List</h2>
        </header>
        {backBtn}
        <List 
          content={content} //can be task groups or tasks
          title={"Things To Do"}
          mode={this.state.mode}
          viewOneGroupHandler={this.viewOneGroupHandler}
          clickedTaskHandler={this.clickedTaskHandler}
        />

      </div>
    );
  }
}
