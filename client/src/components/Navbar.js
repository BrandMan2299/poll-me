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
        <div className="nav">
            <Link to='/'>
                <img className='logo' src={Logo} alt='' width='70px' />
            </Link>
            <label id="label" htmlFor="toggle">&#9776;</label>
            <input type="checkbox" id="toggle" />
            <div className="menu">
                <Link to='/newpoll'>New Poll</Link>
                <Link to='/mypolls'>My Polls</Link>
                <Link onClick={handleLogout}>Log Out</Link>
            </div>
        </div>
    ) : <></>
}