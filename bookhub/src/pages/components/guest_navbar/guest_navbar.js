import React from 'react'
import bookhubLogo from './bookhubLogo.svg'
import { useState } from 'react';
import handleLogin from "../Login/LoginFirebase";

export default function GuestNavbar(props) {
   let [invalidText, setText] = useState("");

    //boolean, email, password, callback, setState, name, age, setUID, yesGenres, noGenres, pages
    function getSubmit(e) {
        e.preventDefault();
        console.log(e);
        try {
            handleLogin(false, e.target[0].value, e.target[1].value, props.setAuth, setText, "","", props.setUID, [], [], "");
        } 
        catch (e){
            setText(e);
        }
        return false;
    }

    return ( //need firebase for sign in and need onboarding for sign up
        <div className={"navbar"}>
            <div className={"logoDiv"}>
                <img src={bookhubLogo} alt="Logo" />
            </div>
            <div className={"title"}>
                <h1>
                    BookHub
                </h1>
            </div>
            <div className={"signin_or_up"}>
                <div className={"login"}>
                    <form onSubmit={getSubmit}>
                    
                        <label>Username:</label>
                        <input className={"login-input"} type="text" id="username" name="username" required />
                        <label>Password:</label>
                        <input className={"login-input"} type="password" id="password" name="password" required />
                        {invalidText}
                        <button className='button' type="submit">Login</button>
                        
                    
                    </form>
                </div>
                

                <button className={"signupbutton"} type="signupbutton"  onClick={() => { props.setCurrent(4) }}>Sign Up!</button>
            </div>


            <style jsx>{`

                .title {
                    padding: 8px;
                    font-family: Rockwell;
                    color: #466422;
                }

                .login {
                    display: flex;
                    position: relative;
                    width: 550px;
                    font-family: Rockwell;
                }

                .signupbutton {
                    width: 60px;
                    height: fit-content;
                    color: #452B14;
                    background-color: #DFD5D0;
                    border: none;
                    margin-top: 1px;
                    border-radius: 10px;
                    margin-left: 181px;
                    height: 15px;
                    font-family: Rockwell;
                    padding: 3px;
                }

                .button {
                    width: 60px;
                    height: fit-content;
                    color: #452B14;
                    background-color: #DFD5D0;
                    border: none;
                    margin-top: 1px;
                    border-radius: 10px;
                    height: 15px;
                    font-family: Rockwell;
                    padding: 3px;
                }

                .signin_or_up {
                    top: 0;
                    position: absolute;
                    right: 5px;
                    z-index: 3;
                }
                
                input {
                    margin-right: 3px;
                    margin-left: 1px;
                    border-radius: 10px;
                    border-top-width: 0;
                    border-left-width: 0;
                    border-bottom-width: 0;
                    border-right-width: 0;
                    height: 18px;
                    background-color: #DFD5D0;
                }

                form {
                    margin-bottom: 1%;
                }

                .navbar {
                    height: 45px;
                }
                
            `}</style>
        </div>



    )
}