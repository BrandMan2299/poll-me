import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Logo from '../images/Logo.png';


export default function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to='/'>
                    <img className='logo' src={Logo} alt='' width='70px' />
                </Link>
                <div className="container-fluid">
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <Link className="nav-link" to="/newpoll">
                                <li className="nav-item">New Poll</li>
                            </Link>
                            <Link className="nav-link" to="/history">
                                <li className="nav-item">History</li>
                            </Link>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}