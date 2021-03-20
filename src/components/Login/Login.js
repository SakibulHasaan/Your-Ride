import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { UserContext } from "../../App";
import { useHistory, useLocation } from 'react-router';


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}


const Login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: ''
    });

    const handleGoogleSignInClick = () => {
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const { displayName, email } = result.user;
                const signedInUser = { name: displayName, email: email }
                setLoggedInUser(signedInUser);
                history.replace(from);
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = error.credential;
                console.log(errorMessage);
            });
    }

    const [signup, setSignup] = useState(false);
    const handleSignUpButton = () => 
    {
        setSignup(!signup);
    }
    

    const handleBlur = (e) => {

        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }

        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = passwordHasNumber && isPasswordValid;
        }

        if (isFieldValid) {
            let newUser = { ...user }
            newUser[e.target.name] = e.target.value;
            setUser(newUser);
        }
        
    }

    const updateUserInfo = (name) => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: name,
    
        }).then(res => {
          console.log("Successfully updated Name", res.user);
        }).catch(function (error) {
          console.log(error);
        });
      }
    

    const handleSubmit = (e) => {
        if (signup && user.password && user.email) {
          firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((res) => {
              const newUser = { ...user };
              newUser.error = '';
              newUser.success = true;
              setUser(newUser);
              alert("Successfully created your Account. Now Log in to your account")
              updateUserInfo(user.name);
            })
            .catch((error) => {
              const newUser = { ...user };
              newUser.error = 'User already exits';
              newUser.success = false;
              setUser(newUser);
              console.log("Creation Error", error.message);
              
            });
        }
        else
            {
                alert("Invalid Email or Password")
            }
        
    
        if (!signup && user.password && user.email) {
          firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((res) => {
              const newUser = { ...user };
              newUser.error = '';
              newUser.success = true;
              setUser(newUser);
              console.log('Sign in User', res.user);
              const signedInUser = { name: user.name, email: user.email }
                setLoggedInUser(signedInUser);
                history.replace(from);
            })
            .catch((error) => {
              const newUser = { ...user };
              newUser.error = 'User already exits';
              newUser.success = false;
              setUser(newUser);
            });
        }
        else
            {
                alert("Invalid Email or Password")
            }
        e.preventDefault();
      }
      
            
    

    const handleSignOut = (e) => {
        setLoggedInUser({});
    }

    return (
        <div className="w-50 mr-3">
            {
                loggedInUser.email ? <button onClick={handleSignOut}>Sign out</button> :
                    <>
                        <h1>{signup ? 'Sign up' : 'Login'}</h1>

                        <form onSubmit={handleSubmit}>
                            {
                                signup ? <>
                                    <input className="form-control" type="text" name="name" placeholder="Your Name" onBlur={handleBlur} /> <br />
                                </> : <span></span>
                            }
                            <input className="form-control" type="text" name="email" placeholder="Your Email" onBlur={handleBlur} required /><br />
                            <input className="form-control" type="password" name="password" placeholder="Enter Password" onBlur={handleBlur} required /> <br />
                            {
                                signup ? <><input type="submit"  className="btn btn-primary" value="Sign up"></input> {
                                    user.error ? <span style={{color:'red'}}> {user.error}</span> : <span></span>
                                } <br /> <br /> </> 
                                : 
                                <>  <input type="submit"  className="btn btn-primary" value="Login"></input> {user.success &&  <span> Login Success</span> } <br /> <br /></>
                            }

                            </form>
                            {
                                signup ?

                                    <>
                                        Already have an account? <button onClick={handleSignUpButton}>Sign in </button> <br /> <br />
                                    </>

                                    : <>
                                        Don't have an account? <button onClick={handleSignUpButton}>Sign up</button>
                                        <br /> <br />
                                    </>
                            }
                        

                        <p>---- or ----</p>
                        <button className="btn btn-primary" onClick={handleGoogleSignInClick}>Sign in with Google</button>

                    </>
            }

        </div>

    );
};

export default Login;