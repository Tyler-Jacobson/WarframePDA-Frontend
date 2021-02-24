import { Link } from 'react-router-dom';



// Logo



// Home

// Warframes/Items

// About This Project

const Nav = function() {
    return (
        <div>
            <Link to="/">Logo</Link>
            <div>
                <Link to="/">Home</Link>
                <Link to="/items">Warframes</Link>
                <Link to="/about">About This Project</Link>
                <a  href="mailto:TylerJacobsonSE@gmail.com"
                    target="_blank"
                    rel="noreferrer">
                        Contact
                </a>
                            
            </div>
        </div>
    )
}

export default Nav;