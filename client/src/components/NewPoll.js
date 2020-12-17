import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import './NewPoll.css'
import NewPollOneQue from './NewPollOneQue';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function NewPoll() {
    const [answers, setAnswers] = useState([])
    const [inputs, setInputs] = useState([])
    const [show, setShow] = useState(false);
    const [url, setUrl] = useState()

    const pollName = useRef()
    const pollExplanation = useRef();

    const { currentUser } = useAuth()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const addQue = () => {
        const temp = answers.slice();
        const newInputs = inputs.slice()
        newInputs.push({})
        temp.push(<NewPollOneQue numOfQue={temp.length + 1} inputs={newInputs} setInputs={setInputs} />)
        setAnswers(temp)
        setInputs(newInputs);
    }

    useEffect(() => {
        addQue()
    }, [])

    const generate = async () => {
        const finalInput = inputs.slice();
        finalInput.forEach(question => {
            question.votes1 = 0;
            question.votes2 = 0;
            question.votes3 = 0;
            question.votes4 = 0;
        })
        const poll = {
            title: pollName.current.value,
            explanation: pollExplanation.current.value,
            creator: currentUser.email,
            questions: finalInput,
            date: new Date()
        }
        const { data } = await axios.post("/api/polls", poll);
        setUrl(data)
        handleShow()
    }

    return (
        <div className="new-poll-body">
            <div className="card new-poll-card" width="18rem;">
                <div className="card-body">
                    <h2 htmlFor="header">Poll Name</h2>
                    <textarea className="poll-name" ref={pollName} placeholder="Insert Poll Name" />
                    <br />
                    <h5 htmlFor="header">Poll Explaination</h5>
                    <textarea className="poll-explaination" ref={pollExplanation} placeholder="Insert Explaination" />
                </div>
                <form onSubmit={handleSubmit} className="form-questions">
                    <div id="answersSection" >
                        {answers}
                    </div>
                    <a onClick={addQue}>Add Question</a>
                    <br />
                    <button onClick={generate} className="btn btn-info btn-md new-poll-btn">Generate</button>
                </form>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Poll URL</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're poll URL is {`http://localhost:3000/poll/${url}`}</Modal.Body>
                <Modal.Footer>
                    <Link to={`/dashboard/${url}`}>
                        <Button variant="info" onClick={handleClose}>
                            Go To Dashboard
                        </Button>
                    </Link>
                </Modal.Footer>
            </Modal>
        </div>
    )
}