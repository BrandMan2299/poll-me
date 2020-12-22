import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import './NewPoll.css'
import NewPollOneQue from './NewPollOneQue';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function NewPoll() {
    const [inputs, setInputs] = useState([]);
    const [show, setShow] = useState(false);
    const [url, setUrl] = useState();
    const history = useHistory();

    const pollName = useRef();
    const pollExplanation = useRef();

    const { currentUser } = useAuth();

    const handleClose = () => {
        setShow(false);
        history.push('/');
    };
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault()
    };

    const removeQue = (index) => {
        const newInputs = inputs.slice();
        newInputs.splice(index, 1);
        setInputs(newInputs);
    }

    const addQue = () => {
        const newInputs = inputs.slice();
        const newQuestion = {
            question: "",
            answer1: "",
            answer2: "",
            answer3: "",
            answer4: "",
        }
        newInputs.push(newQuestion)
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
            question.openReplies = [];
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
                        {inputs.map((a, index) => {
                            return <NewPollOneQue index={index} inputs={inputs} setInputs={setInputs} removeQue={() => { removeQue(index) }} />
                        })}
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
                <CopyToClipboard text={`http://localhost:3000/poll/${url}`}>
                    <Button variant="light" onClick={e => e.target.innerText = "Copied!"}>Copy</Button>
                </CopyToClipboard>
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