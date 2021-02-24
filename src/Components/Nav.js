import { Link } from 'react-router-dom';

import '../styles/Nav.css';

// Logo



// Home

// Warframes/Items

// About This Project

const Nav = function() {
    return (
        <div className="nav-spacing">
            <div className="nav">
                <Link className="nav-logo" to="/">Logo</Link>
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