import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { CreateNewUser } from "../../../firebaseAPI/firebaseAPI";

/**
 * Handles log in or sign up for users and throw errors if detected from Firebase's instance. Switch entire view
 * from login page to app page if user is authenticated.
 * 
 * @param {*} boolean - the boolean for sign up mode
 * @param {*} email - email in use
 * @param {*} password - password in use
 * @param {*} callback - callback function to handle switching to main screen
 * @param {*} setState - callback function to handle error processing
 */
export default function handleLogin(boolean, email, password, callback, setState, name, age, setUID, yesGenres, noGenres, pages) {
    if (email == null || email == "") {
        throw "Invalid Login"
    }
    const auth = getAuth();
    if (boolean) {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                
                // create new database entry for account (name and age)
                console.log(user.uid);
                CreateNewUser(user.uid, name, age, email, yesGenres, noGenres, pages);
                setUID(user.uid);
                
                // switch back to explore view
                callback();

            })
            .catch((error) => {
                console.log(error);
                try {
                    handleErrorCode(error.code, setState)
                } catch (e) {
                    alert(e);
                }
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    } else {
        signInWithEmailAndPassword(auth, email, password, setUID)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                callback(true);
                // set users uid to global variable
                setUID(user.uid);
            })
            .catch((error) => {
                console.log(error);
                const errorCode = error.code;
                const errorMessage = error.message;
                try {
                    handleErrorCode(error.code, setState)
                } catch (e) {
                    alert(e);
                }
                
            });
    }


}

/**
 * Takes error code input and callback function and handle different cases of error with logging function defined
 * with callback
 * 
 * @param {*} code error code received from Firebase Auth
 * @param {*} callback Logging function to use with respect to error code received
 */
function handleErrorCode(code, callback) {
    if (code == null || code == "") {
        throw "Invalid error code"
    }
    switch (code) {
        case "auth/email-already-in-use":
            callback("Email already registed, log in instead!");
            break;
        case "auth/invalid-email":
            callback("Invalid Email!");
            break;
        case "auth/user-not-found":
            callback("User not found!");
            break;
        case "auth/wrong-password":
            callback("Wrong Password!");
            break;
        default:
            break;
    }
}