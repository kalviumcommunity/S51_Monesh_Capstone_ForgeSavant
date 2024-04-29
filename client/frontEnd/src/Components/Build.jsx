import React, { useState } from "react";
import '../Styles/Build.css'
import pc from "../assets/custom-gaming-pc.png"

const Build = () => {
    
    return(
        <React.Fragment>
            <div className="Build_Page">
                <div className="Build-Title">
                    <h1><span id="gold">Forge</span> Arena</h1>
                    <h3>Start Forging your Dream PC</h3>
                </div>
                <div className="Build-Area">
                    <div className="selection">Choose Platform</div>
                    <div className="pc-img"><img src={pc} alt="" /></div>
                </div>
            </div>
        </React.Fragment>
    )
};

export default Build;
