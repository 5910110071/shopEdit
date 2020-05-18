/*import React, { Component } from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import { connect } from "react-redux"
import { getUser , resetUser } from "../actions/"

import Register from "../containers/register/Register"


import firebase from "firebase"

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

firebase.initializeApp({
    apiKey: "AIzaSyDxUjkmrMuPt-9RnnnozxJGdQg9u7MgT7E",
    authDomain: "eonlineshop-be81d.firebaseapp.com",
    databaseURL: "https://eonlineshop-be81d.firebaseio.com",
    projectId: "eonlineshop-be81d",
    storageBucket: "eonlineshop-be81d.appspot.com",
    messagingSenderId: "133881687769",
    appId: "1:133881687769:web:bacc443c66e14729a298c8",
    measurementId: "G-BBHGHXVLK3"

})

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSignedIn: false,
            user : null
        }
    }
    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID
            // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            // firebase.auth.GithubAuthProvider.PROVIDER_ID,
            // firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccess: () => false
        }
    }

    componentDidMount = () => {
        
        firebase.auth().onAuthStateChanged(user => {
            console.log("firebase.auth().onAuthStateChanged")
            this.setState({
                isSignedIn: !!user,
                user : user
            })
            if (user)
                this.props.getUser(user.uid)
            else{
                this.props.resetUser()
                console.log("here")
            }
        })
    }

    render() {
        if(this.state.user != null){
            console.log("state",this.state.user.uid)
        }

        console.log("here",this.state.user)
        return (
            <div >
                <Header showCategoryAndSearch={true} menu={this.props.match.path} />
                <div className="container " style={{ minHeight: '79vh', backgroundColor: '#f5f5f5' }} >
                    {this.state.isSignedIn ? (
                        <span>
                            <div>Signed In!</div>
                            <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
                            <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
                            <img
                                alt="profile picture"
                                src={firebase.auth().currentUser.photoURL}
                            />
                        </span>
                    ) : (
                            <div>
                                <h2 className="text-center pt-3 mb-3">กรุณาเข้าสู่ระบบ</h2>
                                <StyledFirebaseAuth
                                    uiConfig={this.uiConfig}
                                    firebaseAuth={firebase.auth()}
                                />
                            </div>

                        )}
                
                {(this.props.user == null && this.state.user != null)&&
                 <div>
                    <Register user_id = {this.state.user.uid}/>
                 </div>
                 }  
                </div>

                <Footer company="Olanlab" email="olan@olanlab.com" />


            </div>
        )
    }
}
function mapStateToProps({ user }) {
    return { user }
}


export default connect(mapStateToProps, { getUser , resetUser })(Login);*/