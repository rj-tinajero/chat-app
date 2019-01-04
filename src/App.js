import React, { Component } from 'react';
import RoomList from './components/RoomList';
import './App.css';

import * as firebase from 'firebase';

// Initialize Firebase
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
  render() {
    return (
      <div className="App">
        <h1>Chat App</h1>
        <RoomList />
      </div>
    );
  }
}

export default App;