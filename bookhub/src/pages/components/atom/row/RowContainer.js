import Row from "./rowAtom"
import { getRowList, getRowList2 } from "../../../../utils/atomUtil"
import { useState } from "react";
import rightarrow from '../../../../assets/Expand_right_double.svg'
import leftarrow from '../../../../assets/Expand_left_double.svg'

export default function RowContainer(props) {
    console.log(props.data);
    const [car, setCar] = useState(0);
    let data = []
    if (props.isExplore) data = getRowList(props.data, props.dislikes);
    else data = getRowList2(props.data);

    const [hasReachEnd, setHasReachEnd] = useState(false);

    function handleRight() {
        if (car == data.length - 1) {
            setCar(0);
            setHasReachEnd(true);
        } else {
            setCar(car + 1);
        }
    }

    function handleLeft() {
        if (car == 0) {
            setCar(data.length - 1);
        } else {
            setCar(car - 1);
        }
    }

    function showInBeginning() {
        if (car == 0 && hasReachEnd) {
            return true;
        }
        if (car == 0 && !hasReachEnd) {
            return false;
        }
        return true;
    }

    function lessThanSix() {
        console.log(data);
        if (data.length === 0 || data.length <= 1) {
            return true;
        } else {
            return false;
        }
    }


    return (
        <>
            {showInBeginning() ? <img className="leftbutton" onClick={handleLeft} src={leftarrow}></img> : <></>}
            <div className={"row"}>
                <Row isExplore={props.isExplore} data={data[car]} uid={props.uid} auth={props.auth}></Row>
            </div>
            {/*   {lessThanSix() ? <></> : <button className="rightbutton" onClick={handleRight}>{'>>'}</button>} */}
            {lessThanSix() ? <></> : <img className="rightbutton" onClick={handleRight} src={rightarrow}></img>}
        </>
    )
}