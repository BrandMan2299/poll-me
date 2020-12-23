import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Button, Carousel } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Charts from './Charts.js';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
    const [results, setResults] = useState();
    const { id } = useParams();
    const { currentUser } = useAuth();

    const totalVotes = (q) => {
        if (q.answer1 === "") {
            return q.openReplies.length
        }
        else {
            return q.votes1 + q.votes2 + q.votes3 + q.votes4
        }
    }

    useEffect(() => {
        (async () => {
            if (!results) {
                const { data } = await axios.post(`/api/polls/results/${id}`, { creator: currentUser.email })
                setResults(data)
            }
        })()
        const interval = setInterval(async () => {
            const { data } = await axios.post(`/api/polls/results/${id}`, { creator: currentUser.email })
            setResults(data)
        }, 5000)
        return () => { clearInterval(interval) }
    }, [currentUser, id, results])

    return results ? (
        !results.error ? (
            <div className="dashboard-body">
                <div className="card new-dashboard-card">
                    <h1 className="dashboard-header">Poll Dashboard</h1>
                    <div className="grid-container">
                        <div className="preview">
                            <h2>{results.title}</h2>
                            <h6>{results.explanation}</h6>
                            {results && results.questions.map((q, index) => {
                                return (
                                    <div className="container answers preview-container" key={index}>
                                        <span className="input-group-text" id="basic-addon1">{index + 1}. {q.question}</span>
                                        <label ></label><br />
                                        <div className="row">
                                            {Object.keys(q).filter(key => key.includes('answer')).map((key, i) => {
                                                return q[key] !== "" && (
                                                    <div className="col-sm" key={'a' + i}>
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
                        <div className="carusela" style={{ marginTop: "10%" }}>
                            <Carousel className="carousel">
                                {results && results.questions.map((q, key) => {
                                    if (q.answer1 !== "") {
                                        return (
                                            <Carousel.Item key={key + 'q'}>
                                                <h3 className="carousel-header" style={{ marginTop: "10px" }}>Question: {q.question}</h3>
                                                <Charts question={q} />
                                            </Carousel.Item>
                                        )
                                    } else {
                                        return (
                                            <Carousel.Item style={{ minHeight: "291px" }} key={key + 'q'}>
                                                <div className="container answers preview-container" style={{ marginLeft: "50px" }}>
                                                    <h3 className="carousel-header" style={{ marginTop: "10px" }}>Question: {q.question}</h3>
                                                    <ul>
                                                        {q.openReplies.map((answer, key) => {
                                                            return (
                                                                <li key={'k' + key}>{answer}</li>
                                                            )
                                                        })}
                                                    </ul>
                                                </div>
                                            </Carousel.Item>
                                        )
                                    }
                                })}
                            </Carousel>
                        </div>
                        <div className="details card" style={{ marginLeft: "10px", marginBottom: "3%" }}>
                            <div className="card-header" style={{ textAlign: "center" }}>Details!</div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><b>Poll URL:</b>  {`http://localhost:3000/poll/${results._id}`}<span>   </span>
                                    <CopyToClipboard text={`http://localhost:3000/poll/${results._id}`}>
                                        <Button variant="light" onClick={e => e.target.innerText = "Copied!"}>Copy</Button>
                                    </CopyToClipboard>
                                </li>
                                <li className="list-group-item"><b>Created At:</b>  {new Date(results.date).toUTCString()}</li>
                                <li className="list-group-item"><b>Voted: </b> {totalVotes(results.questions[0])}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        ) : <div>This is Not Your Poll!</div>
    ) : <div></div>
}