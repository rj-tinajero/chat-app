import React, { Component } from 'react';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged( user => {
            this.props.setUser(user);
          });
    }

    signInWithPopup() {
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup( provider );
    }

    signOut() {
        this.props.firebase.auth().signOut();
    }

    render() {
        return (
            <div>
                <h2>{this.props.user.displayName}</h2>
                <button onClick={this.signInWithPopup.bind(this)}>Sign In</button>
                <button onClick={this.signOut.bind(this)}>Sign Out</button>
            </div>
        );
    }
}



export default User;