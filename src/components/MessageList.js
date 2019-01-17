import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            newMsg: ''
        };

        this.messagesRef = this.props.firebase.database().ref('messages');
        this.createMsg = this.createMsg.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            console.log(message);
            message.key = snapshot.key;
            this.setState({ messages: [...this.state.messages, message]});
        }); 
    }

    displayTime() {
        this.messagesRef.push({
            sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
        });
    }

    createMsg(event){
        event.preventDefault();
        this.messagesRef.push({
            content: this.state.newMsg, 
            roomId: this.props.activeRoom.key,
            username: this.props.user,
            sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
        });
    }

    handleChange(event) {
        this.setState({newMsg: event.target.value})
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

                <footer>
                    <form onSubmit={this.createMsg.bind(this)}>
                        <input type="text" placeholder="Write your message here..." value={this.state.newMsg} onChange={this.handleChange.bind(this)}></input>
                        <input type="submit" value="Send" ></input>
                    </form>
                </footer>
            </div>
        );
    }
}

export default MessageList; 