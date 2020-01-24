import React, { Component } from 'react';

class User extends Component {
    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged( user => {
            console.log(this.props.setUser(''));
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
                {!this.props.user ? null : <h5>User: {this.props.user}</h5>}
                {this.props.user ? <button onClick={this.signOut.bind(this)}>Sign Out</button> : <button onClick={this.signInWithPopup.bind(this)}>Sign In</button>}
                
            </div>
        );
    }
}



export default User;