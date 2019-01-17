import React, { Component } from 'react';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
import './App.css';
import * as firebase from 'firebase';


var config = {
  apiKey: "AIzaSyAb1YIu-Nl1s9WIJgodYWFAv2FuZOwgHHo",
  authDomain: "chat-app-98360.firebaseapp.com",
  databaseURL: "https://chat-app-98360.firebaseio.com",
  projectId: "chat-app-98360",
  storageBucket: "",
  messagingSenderId: "1004219907080"
};
firebase.initializeApp(config);


class App extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      activeRoom: null,
      user: null
    };

    this.setActiveRoom = this.setActiveRoom.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  setActiveRoom(room) {
    this.setState({activeRoom: room})
  }

  setUser(newName) {
    this.setState({user: newName})
  }

  render() {
    return (
      <div>
        <div className="App">
          <h1>Chat App</h1>
          <User firebase={firebase} user={this.state.user} setUser={this.setUser}/>
          <RoomList firebase= {firebase} setActiveRoom={this.setActiveRoom} activeRoom={this.state.activeRoom}/>
        </div>
        <div className="msg-list">
          <MessageList firebase= {firebase} activeRoom={this.state.activeRoom} user={this.state.user}/>
        </div>
      </div>
    );
  }
}

export default App;