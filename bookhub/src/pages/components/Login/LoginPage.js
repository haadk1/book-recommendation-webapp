/* import { useState } from "react";
import handleLogin from "./LoginFirebase";

export default function LoginPage(props) {
    let [newUser, setNewUser] = useState(false);
    let [invalidText, setText] = useState("");

    function getSubmit(e) {
        e.preventDefault();
        if (!newUser) {
            handleLogin(newUser, e.target[0].value, e.target[1].value, props.callback, setText);
        } else {
            if (e.target[1].value !== e.target[2].value) {
                alert("Unmatched passwords!");
                return;
            }
            handleLogin(newUser, e.target[0].value, e.target[1].value, props.callback, setText);
        }
        return false;
    }

    function handleNew(e) {
        setNewUser(!newUser);
    }
    return (
        <div>
            <h1>Welcome to Center for Nursing Excellence App</h1>
            <div id="firebaseui-auth-container"></div>
            <div id="loader">Sign in to continue Admin!</div>

            {newUser ? <h2>Sign Up form</h2> : <h2>Sign In form</h2>}
            <form onSubmit={getSubmit}>
                <div className="login-input-container">
                    <label>Email</label>
                    <input className="login-input" type="text" minLength="3" required></input>
                </div>
                <div className="login-input-container">
                    <label>Password</label>
                    <input className="login-input" type="password" minLength="3" required></input>
                </div>
                {newUser ?
                    <div className="login-input-container">
                        <label>Confirm Password</label>
                        <input className="login-input" type="password" minLength="3" required></input>
                    </div> :
                    <div></div>}<br></br>
                <button type="submit">Login</button>
                <button type="button" onClick={handleNew}>{newUser ? "Switch to Sign In" : "Create Account"}</button>
            </form>
            <h2>{invalidText}</h2>
        </div>
    )
} */