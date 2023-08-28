import { default_fetch } from "../../../utils/bookmatch";
import { useState, useEffect } from "react";
import RowContainer from "../atom/row/RowContainer";

export default function Explore_default(props) {
    if (props == undefined || props.data == undefined) return;


    return (
        <>
            {props.data.map((val, i) => {
                return <div className={"rowContainer"} key={i}>
                    <h3>{val.attr == undefined ? "" : val.attr}</h3>
                    <RowContainer isExplore={true} dislikes={props.dislikes} data={val.data} key={i} uid={props.uid} auth={props.auth}></RowContainer>
                </div>
            })}
        </>
    )

}