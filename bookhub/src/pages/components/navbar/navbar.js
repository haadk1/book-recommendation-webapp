import React from 'react'
import bookhubLogo from './bookhubLogo.svg'
import blankProfile from './blank_profile.svg'
import Hamburger from './HamNav'

export default function Navbar(props) {
    
    
    return (
        <div className={"navbar"}>
            <div className={"logoDiv"}>
            <img src={bookhubLogo} alt="Logo" />
            </div>
            <div className={"title"}>
                <h1>
                    BookHub
                </h1>
            </div>
            <div className={"hamDiv"}>
                <img className={"profile"} src={blankProfile} alt="this will be profile" /> 
                < Hamburger setAuth = {props.setAuth} setCurrent = {props.setCurrent} className={"hamicon"} />
            </div>

            <style jsx>{`
                .hamDiv{
                    display: flex;
                }

                .profile{
                    margin-right: 20px;
                    margin-bottom: 10px;
                }
                
            `}</style>
        </div>

        

    )
}