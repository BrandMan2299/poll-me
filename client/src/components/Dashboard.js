import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Carousel, Button } from 'react-bootstrap';
import Charts from './Charts.js';
import { useAuth } from '../contexts/AuthContext.js';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function Dashboard() {
    const [results, setResults] = useState();
    const { id } = useParams();
    const { currentUser } = useAuth();

    useEffect(() => {
        (async () => {
            const { data } = await axios.post(`/api/polls/results/${id}`, { creator: currentUser.email })
            console.log(data);
            setResults(data)
        })()
    }, [])

    return results ? (
        !results.error ? (
            <div className="dashboard-body">
                <div className="card new-dashboard-card" width="18rem;">
                    <h1 className="dashboard-header">Poll Dashboard</h1>
                    <div className="grid-container">
                        <div className="preview">
                            <h2>{results.title}</h2>
                            <h6>{results.explanation}</h6>
                            {results && results.questions.map((q, index) => {
                                return (
                                    <div className="container answers preview-container">
                                        <span className="input-group-text" id="basic-addon1">{index + 1}. {q.question}</span>
                                        <label ></label><br />
                                        <div className="row">
                                            {Object.keys(q).filter(key => key.includes('answer')).map((key, i) => {
                                                return q[key] !== "" && (
                                                    <div className="col-sm">
                                                        <div className="input-group mb-3">
                                                            <input type="radio" id={q._id + (i + 1)} disabled name={index} value={`${i + 1}`} />
                                                            <label htmlFor={q._id + (i + 1)} >{i + 1}. {q[`answer${i + 1}`]}</label><br />
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="carusela">
                            <Carousel className="carousel">
                                {results && results.questions.map(q => {
                                    return (
                                        <Carousel.Item>
                                            <h3 className="carousel-header">Question: {q.question}</h3>
                                            <Charts question={q} />
                                        </Carousel.Item>
                                    )
                                })}
                            </Carousel>
                        </div>
                        <div className="card details" style={{ marginLeft: "10px" }}>
                            <div className="card-header" style={{ textAlign: "center" }}>Details!</div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><b>Poll URL:</b> {`http://localhost:3000/poll/${results._id}`}<span>   </span>
                                    <CopyToClipboard text={`http://localhost:3000/poll/${id}`}>
                                        <Button variant="light" onClick={e => e.target.innerText = "Copied!"}>Copy</Button>
                                    </CopyToClipboard></li>
                                <li className="list-group-item"><b>Created At:</b> {new Date(results.date).toUTCString()}</li>
                                <li className="list-group-item"><b>Voted:</b> {results.questions[0].votes1 + results.questions[0].votes2 + results.questions[0].votes3 + results.questions[0].votes4}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        ) :
            <div>
                this is not your poll...
            </div>) : <div></div>
}