import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NewPoll.css'
import NewPollOneQue from './NewPollOneQue';


export default function NewPoll() {
    const [answers, setAnswers] = useState([])
    const [inputs, setInputs] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
    }
    const addQue = () => {
        const temp = answers.slice();
        const newInputs = inputs.slice()
        newInputs.push({ questionNumber: temp.length + 1 })
        temp.push(<NewPollOneQue numOfQue={temp.length + 1} inputs={newInputs} setInputs={setInputs} />)
        setAnswers(temp)
        setInputs(newInputs);
    }


    useEffect(() => {
        addQue()
    }, [])

    useEffect(() => {
        console.log("render");
    }, [inputs])


    return (
        <div className="new-poll-body">
            <div className="card new-poll-card" width="18rem;">
                <div className="card-body">
                    <h2 htmlFor="header">Poll Name</h2>
                    <textarea className="poll-name" placeholder="Insert Poll Name" />
                    <br />
                    <h5 htmlFor="header">Poll Explaination</h5>
                    <textarea className="poll-explaination" placeholder="Insert Explaination" />
                </div>
                <form onSubmit={handleSubmit} className="form-questions">
                    <div id="answersSection" >
                        {answers}
                    </div>
                    <a onClick={addQue}>Add Question</a>
                    <br />
                    <button className="btn btn-info btn-md new-poll-btn">Generate</button>
                </form>
            </div>
        </div>
    )
}