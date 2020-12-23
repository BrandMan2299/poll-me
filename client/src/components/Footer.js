import React from 'react';
import { useAuth } from '../contexts/AuthContext.js'

export default function Footer() {
    const { currentUser } = useAuth();

    return currentUser ? (
        <div>
            <footer className="footer text-muted" >
                <div className="container footer-container">
                    <p>Contact us: <a href="mailto:pollmebaby@gmail.com" style={{ color: "#6495ED" }}>pollmebaby@gmail.com</a></p>
                    <p> &copy; PollMe made by Eran Dahan and Itai Brand</p>
                </div>
            </footer>
        </div>
    ) : <div></div>
}