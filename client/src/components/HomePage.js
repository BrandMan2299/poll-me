import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../contexts/AuthContext";

export default function HomePage() {
    const [lastPolls, setLastPolls] = useState([])

    const { currentUser } = useAuth()

    useEffect(() => {
        (async () => {
            const { data } = await axios.post(`/api/user/history/recent`, {
                creator: currentUser.email
            })
            setLastPolls(data)
        })()
    }, [currentUser])

    return lastPolls ? (
        <div className="homePage-body">
            <div className="header text-center" >
                <h1>PollMe</h1>
                <h4>
                    PollMe is a Live Poll app that keeps the students engaged,
                    and provide analytics to the lecturer!
                </h4>
                <p>
                    <Link to='/newpoll'>
                        <Button variant="info">Make a new Poll</Button>
                    </Link>
                </p>
            </div>
            <div className="container" style={{ minHeight: "30vh" }}>
                <h3 className="popularHeader">My Last Polls</h3>
                <div className="row">
                    {lastPolls.map((pollPreview, key) => {
                        return (
                            <div className="col-md-4" key={key}>
                                <div className="card mb-4 shadow-sm">
                                    <div className="card-header">
                                        Created At: {new Date(pollPreview.date).toDateString()}
                                    </div>
                                    <div className="card-body last-poll-card">
                                        <h5 className="card-title">{pollPreview.title}</h5>
                                        <p className="card-text">{pollPreview.explanation}</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group">
                                                <Link to={`/dashboard/${pollPreview._id}`}>
                                                    <button type="button" className="btn btn-sm btn-outline-secondary">View Dashboard</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer text-muted" style={{ fontSize: "75%", backgroundColor: "white" }}>
                                        Public URL: {`http://localhost:3000/poll/${pollPreview._id}`}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    ) : <></>
}