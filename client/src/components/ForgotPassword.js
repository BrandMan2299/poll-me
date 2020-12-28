import React, { useRef, useState } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { Alert } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../images/Logo.png';
import { useAuth } from "../contexts/AuthContext.js"

export default function ForgotPassword() {

    const emailRef = useRef()
    const { resetPassword, currentUser } = useAuth()
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage("")
            setError("")
            await resetPassword(emailRef.current.value)
            setMessage("Check your inbox for further instructions")
        } catch {
            setError("Failed to reset password")
        }
    }

    return !currentUser ? (
        <div className="body">
            <form className="form-signin" onSubmit={handleSubmit}>
                <img className="mb-4" src={Logo} alt="" width="200" height="200" />
                <h1 className="h3 mb-3 font-weight-normal">Forgot Password?</h1>
                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus ref={emailRef} autoComplete="off" />
                <button className="btn btn-lg btn-info btn-block" type="submit">Reset Password</button>
                <p className="mt-5 mb-3 text-muted">&copy;2020</p>
            </form>
            <div className="w-100 text-center mt-2">
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
            <div className="w-100 text-center mt-2">
                Just rememberd? <Link to="/signin">Sign In</Link>
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