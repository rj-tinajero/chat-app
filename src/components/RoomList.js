import React, { Component } from 'react';
import './RoomList.css';

class Popup extends Component {
  
    render() {
        return (
            <div>
                <form>
                    <h3>Create new room</h3>
                    <textarea placeholder="Enter a room name"></textarea>
                    <button>Submit</button>
        
                </form>
            </div>
        );
    }
}

class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            popup: false
        };

        this.roomsRef = this.props.firebase.database().ref('rooms');
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

    createRoom(e){
        this.roomsRef.push({
            name: e.newRoomName
        });
    }

    render() {
        let popupComponent;
        if (this.state.popup) {
            popupComponent = (<Popup createRoom={(e) => this.createRoom(e)}/>);
        }
        return (
            <div>
                <ul>
                    {this.state.rooms.map((room, index) =>
                        <li id={room.toString()}>{this.state.rooms[index].name}</li>)}    
                </ul>
                <button onClick={this.switchPopup.bind(this)}>
                    New Room
                </button>
                {popupComponent}
            </div>
        );
    }

}

export default RoomList;