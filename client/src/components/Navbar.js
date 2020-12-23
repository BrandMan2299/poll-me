import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../images/Logo.png';
import { useAuth } from '../contexts/AuthContext.js'
import './Navbar.css'

export default function Navbar() {
    const { logout, currentUser } = useAuth();
    const history = useHistory();
    const handleLogout = async () => {
        try {
            await logout();
            history.push('/signin')
        }
        catch {
            console.log("failed to logout");
        }
    }

    return currentUser ? (
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
                            <Link className="nav-link" to="/mypolls">
                                <li className="nav-item">My Polls</li>
                            </Link>
                        </ul>
                    </div>
                </div>
                <a onClick={handleLogout}>Log Out</a>
            </nav>
        </div>
    ) : <></>
}