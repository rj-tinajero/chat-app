import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };

        this.messagesRef = this.props.firebase.database().ref('messages');
        
    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat( message )});
        }); 
    }

    displayTime() {
        this.messagesRef.push({
            sentAt: this.props.firebase.database.ServerValue.TIMPSTAMP
        });
    }

    componentDidUpdate(prevProps){
        if (prevProps.activeRoom !== this.props.activeRoom) {
            console.log("lol", this.props.activeRoom);
            this.setState({messages: []})
            this.messagesRef.orderByChild("roomId").equalTo(this.props.activeRoom.key).on('child_added', snapshot => {
                console.log(snapshot);
                const message = snapshot.val();
                console.log(message);
                message.key = snapshot.key;
                this.setState({ messages: this.state.messages.concat( message )});
            });
        }

    }

    render() {
        if (!this.props.activeRoom) {
            return null;
        }
        return (
            <div>
                {this.state.messages.filter(message => message.roomId == this.props.activeRoom.key).map((message, index) => (
                    <div key={index}><span>{message.username}</span><span>{message.content}</span><span>{message.sentAt}</span></div>
                ))}
            </div>
        );
    }
}

export default MessageList; 