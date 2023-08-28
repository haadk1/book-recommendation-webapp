import { useState } from "react";
import handleLogin from "./LoginFirebase";



export default function SignupPage(props) {
    let [invalidText, setText] = useState("");

    const [genres,setGenres] = useState(["Horror", "Fantasy", "Science Fiction", "Biography", "Adventure", "Romance", "Mystery", "History", "Self-Help", "Children's Books"]);
    let [yesGenres, setYesGenres] = useState([]);
    let [noGenres, setNoGenres] = useState([]);

    

    const [checkedState, setCheckedState] = useState(
        new Array(20).fill(false)
    );

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        setCheckedState(updatedCheckedState);
    };

    // add db user pref here
    function getSubmit(e) {
        //figure out user prefs here
        alert(checkedState);

        for (let i = 0; i < 20; i++) {
            if (i < 10) {
                if (checkedState[i]) {
                    yesGenres = yesGenres.concat(genres[i]).slice();
                }
            } else {
                if (checkedState[i]) {
                    noGenres = noGenres.concat(genres[i-10]).slice();
                }
            }
        }
        

        alert(yesGenres);
        alert(noGenres);

        //add user prefs to database here

        e.preventDefault();
        if (e.target[3].value !== e.target[4].value) {
            setText("Unmatched passwords!");
            return;
        }
        //need to add pages
        handleLogin(true, e.target[2].value, e.target[3].value, props.setCurrent, setText, e.target[0].value, e.target[1].value, props.setUID, yesGenres, noGenres, e.target[5].value);
        return false;
    }

    return (


        <div>
            <style jsx>{`
        .create {
            width: 60px;
                    height: 65px;
                    width: 200px;
                    color: #452B14;
                    background-color: white;
                    border: none;
                    margin-top: 30px;
                    border-radius: 10px;
                    font-family: Rockwell;
                    font-size: 25px;
                    font-color: #466422;
        }
        `}</style>

            <h1>THANK YOU FOR CHOOSING BOOKHUB!</h1>
            <h2>LET'S START WITH THE BASICS:</h2>
            <p>(all fields are required!)</p>

            <br></br>

            <form onSubmit={getSubmit}>
                <div className="login-input-container">
                    <label>First Name</label>
                    <input className="login-input" type="text" minLength="3" required></input>
                </div>
                <div className="login-input-container">
                    <label>Age</label>
                    <input className="login-input" type="number" required></input>
                </div>
                <div className="login-input-container">
                    <label>Email</label>
                    <input className="login-input" type="text" minLength="3" required></input>
                </div>
                <div className="login-input-container">
                    <label>Password</label>
                    <input className="login-input" type="password" minLength="6" required></input>
                </div>

                <div className="login-input-container">
                    <label>Confirm Password</label>
                    <input className="login-input" type="password" minLength="6" required></input>
                </div>
                <br></br>

                <h2>NOW LET'S GET YOUR READING PREFERENCES:</h2>
                <p>(all fields are optional!)</p>

                <br></br>

                <div className="login-input-container">
                    <label>Around what number of pages do you usually prefer?</label>
                    <input className="login-input" type="number" minLength="1" ></input>
                </div>

                

                <div className="checkbox-holder">
                    <h4>Choose the genres you enjoy: </h4>
                    <input
                        type="checkbox"
                        id= {`genre-0`}
                        name="Horror"
                        value="Horror"
                        checked={checkedState[0]}
                        onChange={() => handleOnChange(0)}
                    />
                    <label htmlFor={`genre-0`}> Horror </label>
                    <input
                        type="checkbox"
                        id= {`genre-1`}
                        name="Fantasy"
                        value="Fantasy"
                        checked={checkedState[1]}
                        onChange={() => handleOnChange(1)}
                    />
                    <label htmlFor={`genre-1`}> Fantasy </label>
                    <input
                        type="checkbox"
                        id= {`genre-2`}
                        name="Science Fiction"
                        value="Science Fiction"
                        checked={checkedState[2]}
                        onChange={() => handleOnChange(2)}
                    />
                    <label htmlFor={`genre-2`}> Science Fiction </label>
                    <input
                        type="checkbox"
                        id= {`genre-3`}
                        name="Biography"
                        value="Biography"
                        checked={checkedState[3]}
                        onChange={() => handleOnChange(3)}
                    />
                    <label htmlFor={`genre-3`}> Biography </label>
                    <input
                        type="checkbox"
                        id= {`genre-4`}
                        name="Adventure"
                        value="Adventure"
                        checked={checkedState[4]}
                        onChange={() => handleOnChange(4)}
                    />
                    <label htmlFor={`genre-4`}> Adventure </label>
                    <input
                        type="checkbox"
                        id= {`genre-5`}
                        name="Romance"
                        value="Romance"
                        checked={checkedState[5]}
                        onChange={() => handleOnChange(5)}
                    />
                    <label htmlFor={`genre-5`}> Romance </label>
                    <input
                        type="checkbox"
                        id= {`genre-6`}
                        name="Mystery"
                        value="Mystery"
                        checked={checkedState[6]}
                        onChange={() => handleOnChange(6)}
                    />
                    <label htmlFor={`genre-6`}> Mystery </label>

                    <input
                        type="checkbox"
                        id= {`genre-7`}
                        name="History"
                        value="History"
                        checked={checkedState[7]}
                        onChange={() => handleOnChange(7)}
                    />
                    <label htmlFor={`genre-7`}> History </label>

                    <input
                        type="checkbox"
                        id= {`genre-8`}
                        name="Self-Help"
                        value="Self-Help"
                        checked={checkedState[8]}
                        onChange={() => handleOnChange(8)}
                    />
                    <label htmlFor={`genre-8`}> Self-Help </label>

                    <input
                        type="checkbox"
                        id= {`genre-9`}
                        name="Children's Books"
                        value="Children's Books"
                        checked={checkedState[9]}
                        onChange={() => handleOnChange(9)}
                    />
                    <label htmlFor={`genre-9`}> Children's Books </label>

                </div>

                <div className="checkbox-holder">
                    <h4>Choose the genres you'd like to avoid: </h4>
                    <input
                        type="checkbox"
                        id= {`genre-10`}
                        name="Horror"
                        value="Horror"
                        checked={checkedState[10]}
                        onChange={() => handleOnChange(10)}
                    />
                    <label htmlFor={`genre-10`}> Horror </label>
                    <input
                        type="checkbox"
                        id= {`genre-11`}
                        name="Fantasy"
                        value="Fantasy"
                        checked={checkedState[11]}
                        onChange={() => handleOnChange(11)}
                    />
                    <label htmlFor={`genre-11`}> Fantasy </label>

                    <input
                        type="checkbox"
                        id= {`genre-12`}
                        name="Science Fiction"
                        value="Science Fiction"
                        checked={checkedState[12]}
                        onChange={() => handleOnChange(12)}
                    />
                    <label htmlFor={`genre-12`}> Science Fiction </label>
                    <input
                        type="checkbox"
                        id= {`genre-13`}
                        name="Biography"
                        value="Biography"
                        checked={checkedState[13]}
                        onChange={() => handleOnChange(13)}
                    />
                    <label htmlFor={`genre-13`}> Biography </label>
                    <input
                        type="checkbox"
                        id= {`genre-14`}
                        name="Adventure"
                        value="Adventure"
                        checked={checkedState[14]}
                        onChange={() => handleOnChange(14)}
                    />
                    <label htmlFor={`genre-14`}> Adventure </label>
                    <input
                        type="checkbox"
                        id= {`genre-15`}
                        name="Romance"
                        value="Romance"
                        checked={checkedState[15]}
                        onChange={() => handleOnChange(15)}
                    />
                    <label htmlFor={`genre-15`}> Romance </label>
                    <input
                        type="checkbox"
                        id= {`genre-16`}
                        name="Mystery"
                        value="Mystery"
                        checked={checkedState[16]}
                        onChange={() => handleOnChange(16)}
                    />
                    <label htmlFor={`genre-16`}> Mystery </label>

                    <input
                        type="checkbox"
                        id= {`genre-17`}
                        name="History"
                        value="History"
                        checked={checkedState[17]}
                        onChange={() => handleOnChange(17)}
                    />
                    <label htmlFor={`genre-17`}> History </label>

                    <input
                        type="checkbox"
                        id= {`genre-18`}
                        name="Self-Help"
                        value="Self-Help"
                        checked={checkedState[18]}
                        onChange={() => handleOnChange(18)}
                    />
                    <label htmlFor={`genre-18`}> Self-Help </label>

                    <input
                        type="checkbox"
                        id= {`genre-19`}
                        name="Children's Books"
                        value="Children's Books"
                        checked={checkedState[19]}
                        onChange={() => handleOnChange(19)}
                    />
                    <label htmlFor={`genre-19`}> Children's Books </label>
                </div>

                

                <button className = "create" type="submit">Create user</button>
            </form>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            {/* remove later!!! */}
            <h2>{invalidText}</h2>
            <button className = "create" type = "button" onClick={()=>{props.back(1)}}>Guest Experience</button>
        </div>
    )
}