import React from 'react';
import Hamburger from "./hamburger";
import { useState } from 'react';

export default function HamNav(props){

    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    const toggleHamburger = () =>{
        setHamburgerOpen(!hamburgerOpen)
    }

    return( //add click for li here
        <div>
            <div className="navigation">
                <div className="hamburger" onClick={toggleHamburger}>
                        <Hamburger isOpen={hamburgerOpen}/>
                    </div>
                <ul>
                    <li onClick={() => { props.setCurrent(3) }}>Account Info </li>
                    <li onClick={() => { window.location.reload(false); props.setCurrent(1) }}>Log Out</li> 
                    
                </ul>
                    
            </div>


            <style jsx>{`

                .navigation{
                    width: 100%;
                    height: 50px;
                    
                }

                
                  
                    .hamburger{
                        z-index: 6;
                        margin-right: 58px;
                        margin-top: 2px;
                    }

                
                   
                    .navigation ul{
                        display: ${hamburgerOpen ? 'inline' : 'none'};
                        background-color: brown;
                        height: fit-content;
                        width: fit-content;
                        position: relative;
                        color: white;
                        margin: 0;
                        
                        

                    }

                    .navigation ul li{
                        list-style-type: none;
                        color: #452B14;
                        background-color: #DFD5D0;
                        font-size: 17px;
                    }
                } 
                
            `}</style>
        </div>
    )

}