import { Link } from 'react-router-dom';
import '../styles/Nav.css';

import logo from "../assets/logo.png"

// Logo



// Home

// Warframes/Items

// About This Project

const Nav = function() {
    return (
        <div className="nav-spacing">
            <div className="nav">
                <Link className="logo-link-wrapper" to="/">
                    <div className="nav-logo-container">
                        <img className="nav-logo" src={logo} alt="logo"/>
                        <p className="nav-logo-text" to="/">WarframePDA</p>
                    </div>
                </Link>
                <div className="right-nav">
                    <Link className="nav-link" to="/">Home</Link>
                    <Link className="nav-link" to="/items">Warframes</Link>
                    <Link className="nav-link nav-link-large" to="/about">About This Project</Link>
                    <a  className="nav-link"
                        href="mailto:TylerJacobsonSE@gmail.com"
                        target="_blank"
                        rel="noreferrer">
                            Contact
                    </a>
                                
                </div>
            </div>
        </div>
    )
}

export default Nav;