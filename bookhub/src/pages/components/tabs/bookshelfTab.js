import { useEffect, useState } from "react"
import { addBookToUser, getData } from "../../../firebaseAPI/firebaseAPI"
import RowContainer from "../atom/row/RowContainer";

export default function Bookshelf(props) {
    // use props.auth to check if user has logged in/ recently made account

    //testing variables for book add/ retrieval
    let [books, setBooks] = useState([]);
    let [books2, setBooks2] = useState([]);
    let [books3, setBooks3] = useState([]);



    function GetCompleted(uid) {
        getData('/users/' + uid + '/completed_books', setBooks);
    }

    useEffect(() => {
        GetCompleted(props.uid);
        GetForLater(props.uid);
        GetLightReading(props.uid);
    }, [props.auth]);

    function GetForLater(uid) {
        getData('/users/' + uid + '/forLater_books', setBooks2);
    }

    function GetLightReading(uid) {
        getData('/users/' + uid + '/lightReading', setBooks3);
    }


    //testing function
    function testAddBook(uid, name) {
        addBookToUser(uid, name);
    }

    return (
        <div>
            {props.auth ?
                <div>
                    <h1>Your Bookshelves</h1>
                    <div className={"rowContainer"} >
                        <h3>Completed</h3>
                        <RowContainer isExplore={false} dislikes={props.dislikes} data={books} uid={props.uid} auth={props.auth}></RowContainer>
                    </div>
                    <div className={"rowContainer"} >
                        <h3>For later</h3>
                        <RowContainer isExplore={false} dislikes={props.dislikes} data={books2} uid={props.uid} auth={props.auth}></RowContainer>
                    </div>
                    <div className={"rowContainer"} >
                        <h3>LightReading</h3>
                        <RowContainer isExplore={false} dislikes={props.dislikes} data={books3} uid={props.uid} auth={props.auth}></RowContainer>
                    </div>
                </div>

                : <h1>You are not logged in</h1>}
            {/* <h1>{props.uid}</h1> */}


            {/* <table>
  <thead>
    <tr>
      <th style={{fontSize: "2.0rem", padding: "0.5rem 1rem"}}>Completed</th>
      <th style={{fontSize: "2.0rem", padding: "0.5rem 1rem"}}>For Later</th>
      <th style={{fontSize: "2.0rem", padding: "0.5rem 1rem"}}>Light Reading</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td onLoad={() => {GetCompleted(props.uid);}}> {books.map((key) => { 
                return (
                    <div> {key} </div>
                
                ) 
            })} </td>

      <td> <td onLoad={() => {GetForLater(props.uid);}}> {books2.map((key) => { 
                return (
                    <div> {key} </div>
                
                ) 
            })} </td></td>
      <td> <td onLoad={() => {GetLightReading(props.uid);}}> {books3.map((key) => { 
                return (
                    <div> {key} </div>
                
                ) 
            })} </td></td>
    </tr>

  </tbody>
</table> */}













            {/* testing function !!! */}
            {/* <button type="button" onClick={()=> {testAddBook(props.uid, "Fake Ah Book")}}>ADD BOOK</button>
            <br></br>  <br></br>  <br></br>  <br></br>  <br></br>
            <button type="button" onClick={() => { GetCompleted(props.uid) }}>GET BOOK</button> */}
            <br></br>  <br></br>  <br></br>  <br></br>  <br></br>

            {/*             
            {books.map((val) => { 
                return (
                    <div> {val}</div>
                ) 
            })} */}
        </div>
    )
}