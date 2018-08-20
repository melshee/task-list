import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import GroupIcon from './assets/images/Group.svg'
import IncompleteIcon from './assets/images/Incomplete.svg'
import LockedIcon from './assets/images/Locked.svg'
import CompletedIcon from './assets/images/Completed.svg'

export default class Icon extends Component {
  static propTypes = {
    type: PropTypes.string, /*Indicates the type of icon to display*/
  }

  constructor(props){
    super(props);

    this.typeToImg = { //to map this.props.type to image
      "group": GroupIcon,
      "incomplete": IncompleteIcon,
      "locked":  LockedIcon,
      "complete": CompletedIcon
    }
  }

  render() {
    return (
      <div className="icon">
        <img src={this.typeToImg[this.props.type]} alt="GroupIcon" className="image"/>
      </div>
    );
  }
}
