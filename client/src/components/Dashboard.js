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
        (async () => {
            const { data } = await axios.get(`/api/polls/results/${id}`)
            console.log(data);
            setResults(data)
        })()
    }, [])

    return (
        <div className="dashboard-body">
            <div className="card new-dashboard-card" width="18rem;">
                <h1 className="dashboard-header">Poll Dashboard</h1>
                <div className="grid-container">
                    <div className="preview">
                        preview
                    </div>
                    <div className="carusel">
                        <Carousel>
                            {results && results.questions.map(q => {
                                return (
                                    <Carousel.Item>
                                        <Charts question={q} />
                                        {/* <Carousel.Caption>
                                            <h3>First slide label</h3>
                                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                        </Carousel.Caption> */}
                                    </Carousel.Item>
                                )
                            })}
                        </Carousel>
                    </div>
                    <div className="details">details</div>
                </div>
            </div>
        </div>
    )
}