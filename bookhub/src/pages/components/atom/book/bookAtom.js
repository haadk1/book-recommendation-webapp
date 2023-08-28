import { getImage } from '../../../../utils/atomUtil'
import HoverAtom from './HoverAtom'
import { useState, useRef } from 'react'

export default function Book(props) {
    const source = (props.coverId != undefined) ? props.coverId : 'bookhub/public/tempAssets/book1.jpg';

    let [hover, setHover] = useState(false);
    let [metrics, setMetrics] = useState({});
    let infoStyle = {};

    // input ref of each book containee
    const inputRef = useRef();

    function hoverOn() {
        setHover(true);

        //retrieve div offset and construct style offset for hover info
        setMetrics(inputRef.current.getBoundingClientRect());

        console.log(metrics);

    }
    function hoverOff() {
        setHover(false);
    }

    return (
        <div ref={inputRef} className={"bookContainer"} onMouseEnter={() => { hoverOn() }} onMouseLeave={() => { hoverOff() }}>
            <img className={"img"} src={source} alt="cover" ></img>
            {hover ? <HoverAtom isExplore={props.isExplore} data={props.data} name={props.name} uid={props.uid} style={{ top: `${metrics.top + metrics.height / 2}px`, left: `${metrics.left + metrics.width / 2}px` }} description={props.description} auth={props.auth} authors={props.authors}></HoverAtom> : <></>}
        </div>

    )
}