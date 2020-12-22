import React, { useEffect, useState } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useHistory } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import './OnePoll.css';
import Logo from '../images/Logo.png';
import { Link } from 'react-router-dom';

export default function OnePoll() {
    const [onePoll, setOnePoll] = useState();
    const [show, setShow] = useState(false);
    const [modalBody, setModalBody] = useState("");
    const { id } = useParams();
    const [inputs, setInputs] = useState([]);
    const handleClose = () => {
        setShow(false);
        if (localStorage[`fulfill-${id}`] === "true") {
            history.push('/');
        }
    };
    const handleShow = () => { setShow(true) };
    const history = useHistory();

    const pickAnswer = (e) => {
        const votes = inputs.slice();
        votes[e.target.name] = e.target.value;
        setInputs(votes);
    }

    const submit = async () => {
        if (inputs.length === onePoll.questions.length && !inputs.includes(undefined)) {
            await axios.post(`/api/polls/${id}`, inputs);
            setModalBody("Great Job! Thank you for your input!");
            localStorage.setItem(`fulfill-${onePoll._id}`, "true");
            handleShow()
        }
        else {
            setModalBody("Please Finish Answer All The Questions!");
            handleShow()
        }
    }

    useEffect(async () => {
        const { data } = await axios.get(`/api/polls/${id}`);
        setOnePoll(data);
        if (localStorage[`fulfill-${id}`] === "true") {
            setModalBody("You Can't fill out the Poll twice!");
            handleShow();
        }
    }, [])

    return onePoll && localStorage.fulfill == undefined ? (
        <div>
            <div className="one-poll-body">
                <div className="card new-poll-card" width="18rem;">
                    <div className="card-body">
                        <h2 className="titleHeader" htmlFor="header">{onePoll.title}</h2>
                        <br />
                        <h5 htmlFor="header">{onePoll.explanation}</h5>
                    </div>
                    <div className="form-questions">
                        {onePoll.questions.map((question, index) => {
                            return (
                                <div className="container answers">
                                    <span className="input-group-text" id="basic-addon1">{index + 1}. {question.question}</span>
                                    <label ></label><br />
                                    <div className="row">
                                        <div className="col-sm">
                                            <div className="input-group mb-3">
                                                <input type="radio" id={question._id + "1"} name={index} value="1" onChange={pickAnswer} />
                                                <label htmlFor={question._id + "1"} >1. {question.answer1}</label><br />
                                            </div>
                                        </div>
                                        <div className="col-sm">
                                            <div className="input-group mb-3">
                                                <input type="radio" id={question._id + "2"} name={index} value="2" onChange={pickAnswer} />
                                                <label htmlFor={question._id + "2"}>2. {question.answer2}</label><br />
                                            </div>
                                        </div>
                                        <div className="col-sm">
                                            <div className="input-group mb-3">
                                                <input type="radio" id={question._id + "3"} name={index} value="3" onChange={pickAnswer} />
                                                <div htmlFor={question._id + "3"}>3. {question.answer3}</div>
                                            </div>
                                        </div>
                                        <div className="col-sm">
                                            <div className="input-group mb-3">
                                                <input type="radio" id={question._id + "4"} name={index} value="4" onChange={pickAnswer} />
                                                <label htmlFor={question._id + "4"}>4. {question.answer4}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        <div id="answersSection" >
                        </div>
                        <h5>Created by: {onePoll.creator}</h5>
                        <br />
                    </div>
                    <button className="btn btn-info btn-md send-button" onClick={submit}>Send!</button>
                </div>
                <div className="container footer-container">
                    <Link to='/'>
                        <img className='one-pool' src={Logo} alt='' width='70px' />
                    </Link>
                    <br />
                    <br />
                    <p> &copy; PollMe made by Eran Dahan and Itai Brand</p>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Hey You</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalBody}</Modal.Body>
            </Modal>
        </div>
    ) : <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Hey You</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalBody}</Modal.Body>
            </Modal>
        </>
}