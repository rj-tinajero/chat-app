import React, { Component } from 'react';
import './RoomList.css';



class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            newRoomName: '',
            popup: false
        };

        this.roomsRef = this.props.firebase.database().ref('rooms');
        this.handleChange = this.handleChange.bind(this);
        
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room )});
        });
    }

    switchPopup() {
        this.setState({popup: !this.state.popup})
    }

    createRoom(event){
        event.preventDefault();
        this.roomsRef.push({
            name: this.state.newRoomName
        });
    }

    handleChange(event) {
        this.setState({newRoomName: event.target.value})
    }

    render() {
        
        return (
            <div>
                <ul>
                    {this.state.rooms.map((room, index) =>
                        <li key={index}>{this.state.rooms[index].name}</li>)}    
                </ul>
                <button onClick={this.switchPopup.bind(this)}>
                    New Room
                </button>
                
            {this.state.popup === true ? (() => {
                if (this.state.popup === true) {
                  return  <form onSubmit={this.createRoom.bind(this)}>
                            <h3>Create new room</h3>
                            <input type="text" placeholder="Enter a room name" onChange={this.handleChange.bind(this)} value={this.state.newRoomName}></input>
                            <input type="submit" value="Submit"></input>
                          </form>;
                } })() 
                : null
            } 
                
            </div>
            
                
            
        );
    }

}

export default RoomList;