import React from 'react';
import './Error.css';
import Logo from '../images/Logo.png';
import { Link } from 'react-router-dom';


export default function Error() {
    return (
        <div className="error-body">
            <div className="error-message">
                <h3 className="error-header">404 PAGE</h3>
                <br />
                <Link className="error-link" to="/">
                    <img src={Logo} alt="Logo was suposed to be here"></img>
                    <h1 className="out">Out</h1>
                </Link>
            </div>
        </div>
    )
}