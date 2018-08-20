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

    this.state = {
      mode: "allGroups", /*"allGroups", "oneGroup" */
      taskGroups: {}
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

  componentDidMount(){
    this.setState({
      taskGroups: this.hashIntoGroups()
    })
  }

  viewOneGroupHandler(groupName){
    this.setState({
      mode: "oneGroup"
    });
    console.log("SHOW: ", groupName)
  }

  viewAllGroupsHandler(){
    this.setState({
      mode: "allGroups"
    });
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
          content={this.state.taskGroups}
          title={"Things To Do"}
          mode={this.state.mode}
          viewOneGroupHandler={this.viewOneGroupHandler}
        />

      </div>
    );
  }
}
