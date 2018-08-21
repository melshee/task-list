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

    this.state = {
      mode: "allGroups", /*"allGroups", "oneGroup" */
      tasks: {}
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
      groupName = data[i].group;
      if(groupHash[groupName] === undefined) {
        groupHash[groupName] = [];
      }
      groupHash[groupName].push(data[i]);
    }
    return groupHash;
  }

  getOneGroup(groupName){
    // console.log("gn: ", groupName);
    // console.log(this.state.tasks);
    // console.log("getting one group: ", this.state.tasks[groupName]);
    return this.state.tasks[groupName];
  }

  componentDidMount(){
    this.setState({
      tasks: this.hashIntoGroups()
    })
  }

  viewOneGroupHandler(groupName){
    let groupData = this.getOneGroup(groupName)
    this.setState({
      mode: "oneGroup",
      tasks: groupData
    });
    console.log("SHOW: ", groupName);
  }

  viewAllGroupsHandler(){
    this.setState({
      mode: "allGroups"
    });
  }

  clickedTaskHandler(group, type, id) {
    // console.log("group: ", group)
    // console.log("id: ", id)
    console.log("TYPE: ", type)
    console.log("next: ", this.taskType[type])
    let groupData = this.getOneGroup(group);
    console.log("tasks: ", this.state.tasks);
    this.setState( prevState => {
        let index = prevState.tasks.findIndex(t => {return t.id == id});
        console.log("index!!: ", index);
        prevState.tasks[index].completedAt = "now";
        return prevState;
      })
    //update tasks
  }

  render() {
    let backBtn = this.state.mode === "oneGroup" ? <button type="button" id="back-btn" onClick={this.viewAllGroupsHandler}>Back to All Groups</button> : null 
    return (
      <div className="app">
        <header className="app-header">
          <h2 className="app-title">Task List</h2>
        </header>
        {backBtn}
        <List 
          content={this.state.tasks} //can be task groups or tasks
          title={"Things To Do"}
          mode={this.state.mode}
          viewOneGroupHandler={this.viewOneGroupHandler}
          clickedTaskHandler={this.clickedTaskHandler}
        />

      </div>
    );
  }
}
