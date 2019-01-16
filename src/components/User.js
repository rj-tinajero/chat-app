import React, { Component } from 'react';

class User extends Component {
    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged( user => {
            this.props.setUser(user.email);
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
                <h4>{this.props.user}</h4>
                <button onClick={this.signInWithPopup.bind(this)}>Sign In</button>
                <button onClick={this.signOut.bind(this)}>Sign Out</button>
            </div>
        );
    }
}



export default User;