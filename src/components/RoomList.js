import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: []
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

    

    render() {
        return (
            <div>
                <ul>
                    {this.state.rooms.map((name) =>
                        <li key={name.toString()}>{this.state.rooms.name}</li>)}    
                </ul>

            </div>
        );
    }

}

export default RoomList;