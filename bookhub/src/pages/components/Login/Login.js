import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();


// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

const firebaseConfig = {
    apiKey: "AIzaSyASVYySOu4JHhrNJQOWW28kXNk_iOc-CBY",
    authDomain: "bookhub-a0f39.firebaseapp.com",
    databaseURL: "https://bookhub-a0f39-default-rtdb.firebaseio.com",
    projectId: "bookhub-a0f39",
    storageBucket: "bookhub-a0f39.appspot.com",
    messagingSenderId: "1007110447767",
    appId: "1:1007110447767:web:7b73245fd783c92926bfd2"
};

var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true;
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      }
    },
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    // Other Config
  };

// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);