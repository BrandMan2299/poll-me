import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom'
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
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
        } catch {
            setError("Failed to log in")
        }
        setLoading(false)
    }

    return (
        <div className="body">
            <form className="form-signin" onSubmit={handleSubmit}>
                <img className="mb-4" src={Logo} alt="" width="200" height="200" />
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                {currentUser && currentUser.email}
                {error && <Alert variant="danger">{error}</Alert>}
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus ref={emailRef} />
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" id="inputPassword" className="form-control" placeholder="Password" required ref={passwordRef} />
                <div className="checkbox mb-3">
                    <label><input type="checkbox" value="remember-me" /> Remember me</label>
                </div>
                <button className="btn btn-lg btn-info btn-block" type="submit">Sign in</button>
                <p className="mt-5 mb-3 text-muted">&copy;2020</p>
            </form>
            <div className="w-100 text-center mt-2">
                Don't have an account yet? <Link to="/signup">Sign up</Link>
            </div>
        </div>
    )
}