import { addBookToUser, getData, addBookToCompleted, addBookToForLater, a, addBookToLightReading, addBooktoDislike } from "../../../../firebaseAPI/firebaseAPI"
import sadFace from '../../../../assets/Sad_alt_light.svg'
import happyFace from '../../../../assets/happy_light.svg'

export default function HoverAtom(props) {

    return (
        <div style={props.style} className={"hoverInfo"}>

            {props.isExplore ?
                <div className="reactionContainer">
                    <img src={sadFace} id="sadFace" onClick={() => { addBooktoDislike(props.uid, props.name, props.auth) }}></img>
                    <img src={happyFace} id="happyFace" onClick={() => { addBookToForLater(props.uid, props.data, props.name, props.auth) }}></img>
                    <button id="completed" onClick={() => { addBookToCompleted(props.uid, props.data, props.name, props.auth); }}> Completed </button>
                    <button id="completed" onClick={() => { addBookToLightReading(props.uid, props.data, props.name, props.auth) }}> Light Reading </button>
                </div> : <></>}
            <div className="infoContainer">
                <h4>Title: {props.name}</h4>
                <h4>Author: {props.authors === undefined ? "" : props.authors[0]}</h4>
                <p>Description: {props.description}</p>

            </div>
        </div>
    )
}
//uid is not defined