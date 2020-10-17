import React from 'react';
import "./Header.css";
import githubLogo from "../../images/githubLogo.png";

const Header = () => {
    return (
        <div>
            <nav className="navbar navbar-light site_header">
                <a className="navbar-brand site_title" href="/">
                <img src={githubLogo} alt=""></img>	&nbsp;
                <span><strong> Github User Information </strong></span>
                </a>
            </nav>
        </div>
    );
};

export default Header;