import React, { Component } from 'react';
import RoomList from './components/RoomList';
import './App.css';
import MessageList from './components/MessageList';
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
      activeRoom: null
    };
    
    this.setActiveRoom = this.setActiveRoom.bind(this);
  }

setActiveRoom(room) {
  this.setState({activeRoom: room})
}

  render() {
    return (
      <section>
      <div className="App">
        <h1>Chat App</h1>
        <RoomList firebase= {firebase} setActiveRoom={this.setActiveRoom} activeRoom={this.state.activeRoom}/>
        
      </div>
      <div className="msg-list">
        <MessageList firebase= {firebase} activeRoom={this.state.activeRoom}/>
      </div>
    </section>
    );
  }
}

export default App;