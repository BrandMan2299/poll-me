import React, { useRef, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom'
import { Alert } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signin.css';
import Logo from '../images/Logo.png';
import { useAuth } from "../contexts/AuthContext.js"

export default function Signin() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const { login, currentUser } = useAuth()
    const [error, setError] = useState("")
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("")
            await login(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        } catch {
            setError("Failed to log in")
        }
    }

    return !currentUser ? (
        <div className="body">
            <form className="form-signin" onSubmit={handleSubmit}>
                <img className="mb-4" src={Logo} alt="" width="200" height="200" />
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                {error && <Alert variant="danger">{error}</Alert>}
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus ref={emailRef} autoComplete="off" />
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" id="inputPassword" className="form-control" placeholder="Password" required ref={passwordRef} autoComplete="off" />
                <div className="checkbox mb-3">
                    <label><input type="checkbox" value="remember-me" /> Remember me</label>
                </div>
                <button className="btn btn-lg btn-info btn-block" type="submit">Sign in</button>
                <p className="mt-5 mb-3 text-muted">&copy;2020</p>
            </form>
            <div className="w-100 text-center mt-2">
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
            <footer className="footer error-footer text-muted" >
                <div className="container footer-container">
                    <p>Contact us: <a href="mailto:pollmebaby@gmail.com" style={{ color: "#6495ED" }}>pollmebaby@gmail.com</a></p>
                    <p> &copy; PollMe made by Eran Dahan and Itai Brand</p>
                </div>
            </footer>
        </div>
    ) : <Redirect to='/' />
}