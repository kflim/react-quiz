import React from "react";
import landingPageBg from "../images/landing-page.png";

export default function LandingPage(props) {
    return (
        <div className="landing-page">
            <img src={landingPageBg} className="landing-page-bg" alt=""></img>
            <h1 className="landing-page-title">Quizzical</h1>
            <h3 className="landing-page-desc">Welcome! Are you ready for a quiz?</h3>
            <button className="landing-page-start-btn" onClick={props.switchPage}>Start quiz</button>
        </div>
    )
}