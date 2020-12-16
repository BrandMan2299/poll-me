import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import Charts from './Charts.js';

export default function Dashboard() {
    const [results, setResults] = useState();
    const { id } = useParams();

    useEffect(() => {
        const interval = setInterval(async () => {
            const { data } = await axios.get(`/api/polls/results/${id}`)
            console.log(data);
            setResults(data)
        }, 2000)
        return () => clearInterval(interval)
    }, [])

    return results ? (
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
                                        {(() => {
                                            const answers = [];
                                            for (let i = 1; i <= 4; i++) {
                                                answers.push(
                                                    <div className="col-sm">
                                                        <div className="input-group mb-3">
                                                            <input type="radio" id={q._id + i} disabled name={index} value={`${i}`} />
                                                            <label htmlFor={q._id + i} >{i}. {q[`answer${i}`]}</label><br />
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            return answers;
                                        })()}
                                        <div className="col-sm">
                                            <div className="input-group mb-3">
                                                <input type="radio" id={q._id + "4"} disabled name={index} value="4" />
                                                <label htmlFor={q._id + "4"}>4. {q.answer4}</label>
                                            </div>
                                        </div>
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
                    <div className="card details">

                    </div>
                </div>
            </div>
        </div>
    ) : <div></div>
}