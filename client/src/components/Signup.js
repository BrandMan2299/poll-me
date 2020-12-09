// import React, { useRef, useState } from "react"
// import { Form, Button, Card, Alert } from "react-bootstrap"
// import { useAuth } from "../contexts/AuthContext.js"
// import { Link, useHistory } from "react-router-dom"

// export default function Signup() {
//     const emailRef = useRef()
//     const passwordRef = useRef()
//     const passwordConfirmRef = useRef()
//     const { signup, currentUser } = useAuth()
//     const [error, setError] = useState("")
//     const [loading, setLoading] = useState(false)
//     const history = useHistory()

//     async function handleSubmit(e) {
//         e.preventDefault()

//         if (passwordRef.current.value !== passwordConfirmRef.current.value) {
//             return setError("Passwords do not match")
//         }

//         try {
//             setError("")
//             setLoading(true)
//             await signup(emailRef.current.value, passwordRef.current.value)
//             history.push("/")
//         } catch {
//             setError("Failed to create an account")
//         }
//         setLoading(false)
//     }

//     return (
//         <>
//             <Card>
//                 <Card.Body>
//                     <h2 className="text-center mb-4">Sign Up</h2>
//                     {currentUser && currentUser.email}
//                     {error && <Alert variant="danger">{error}</Alert>}
//                     <Form onSubmit={handleSubmit}>
//                         <Form.Group id="email">
//                             <Form.Label>Email</Form.Label>
//                             <Form.Control type="email" ref={emailRef} required />
//                         </Form.Group>
//                         <Form.Group id="password">
//                             <Form.Label>Password</Form.Label>
//                             <Form.Control type="password" ref={passwordRef} required />
//                         </Form.Group>
//                         <Form.Group id="password-confirm">
//                             <Form.Label>Password Confirmation</Form.Label>
//                             <Form.Control type="password" ref={passwordConfirmRef} required />
//                         </Form.Group>
//                         <Button disabled={loading} className="w-100" type="submit">
//                             Sign Up
//                         </Button>
//                     </Form>
//                 </Card.Body>
//             </Card>
//             <div className="w-100 text-center mt-2">
//                 Already have an account? <Link to="/signin">Sign In</Link>
//             </div>
//         </>
//     )
// }

import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import './Signup.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../images/Logo.png';
import { Link, useHistory } from "react-router-dom";

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            //         history.push("/")
        } catch {
            setError("Failed to create an account")
        }
        setLoading(false)
    }

    return (
        <div className="body">
            <form className="form-signin" onSubmit={handleSubmit} >
                <img className="mb-4" src={Logo} alt="" width="200" height="200" />

                <h1 className="h3 mb-3 font-weight-normal">Please sign un</h1>
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input type="email" id="inputEmail" ref={emailRef} className="form-control" placeholder="Email address" required autoFocus />
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" id="inputPassword" ref={passwordRef} className="form-control" placeholder="Password" required />
                <label htmlFor="inputConfirmPassword" className="sr-only">Password Confirmation</label>
                <input type="password" id="inputConfirmPassword" ref={passwordConfirmRef} className="form-control" placeholder="Confirm Password" required />
                <div className="checkbox mb-3">
                    <label><input type="checkbox" value="remember-me" /> Remember me</label>
                </div>
                <button className="btn btn-lg btn-info btn-block" disabled={loading} type="submit">Sign up</button>
                <p className="mt-5 mb-3 text-muted">&copy;2020</p>
            </form>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/signin">Sign In</Link>
            </div>
        </div>
    )
}