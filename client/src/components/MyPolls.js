import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MyPolls.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../contexts/AuthContext";

export default function MyPolls() {
    const [lastPolls, setLastPolls] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [showed, setShowed] = useState([]);

    const { currentUser } = useAuth();

    useEffect(() => {
        (async () => {
            const { data } = await axios.post(`/api/user/history/all`, {
                creator: currentUser.email
            })
            setLastPolls(data)
        })()
    }, [])

    useEffect(() => {
        setShowed(lastPolls.filter((poll) => {
            return JSON.stringify(poll).includes(searchText);
        }))
    }, [lastPolls, searchText])

    const onTextChange = (e) => {
        setSearchText(e.target.value)
    }

    return (
        <div className="one-poll-body">
            <input class="form-control mr-sm-2 search-input" type="search" placeholder="Search Poll" aria-label="Search" onChange={onTextChange}></input>
            <div className="card my-poll-card" width="18rem;">
                <div className="card-body">
                    <h2 style={{ textAlign: "center" }}>My Polls</h2>
                    <div class="container">
                        <div class="row">
                            {showed.map(pollPreview => {
                                return (
                                    <div class="col-sm">
                                        <div className="card mb-4 shadow-sm">
                                            <div class="card-header">
                                                Created At: {new Date(pollPreview.date).toDateString()}
                                            </div>
                                            <div className="card-body last-poll-card">
                                                <h5 class="card-title">{pollPreview.title}</h5>
                                                <p className="card-text">{pollPreview.explanation}</p>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="btn-group">
                                                        <Link to={`/dashboard/${pollPreview._id}`}>
                                                            <button type="button" className="btn btn-sm btn-outline-secondary">View Dashboard</button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card-footer text-muted" style={{ fontSize: "75%", backgroundColor: "white" }}>
                                                Public URL: {`http://localhost:3000/poll/${pollPreview._id}`}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}