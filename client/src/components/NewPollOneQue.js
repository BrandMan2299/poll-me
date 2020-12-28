import React, { useState, useEffect } from 'react';
import { BsTrash, BsPlus, BsDashSquare } from 'react-icons/bs';

export default function NewPollOneQue(prop) {

    const [question, setQuestion] = useState("");
    const [answers, setAnswers] = useState([""]);

    const typing = (e) => {
        const newAnswers = answers.slice();
        const text = capitalizeFirstLetter(e.target.value);
        newAnswers[e.target.name] = text;
        setAnswers(newAnswers);
    }

    const addAns = () => {
        const newAnswers = answers.slice();
        if (newAnswers.length >= 4) {
            return
        }
        newAnswers.push("");
        setAnswers(newAnswers);
    }

    const removeAns = (index) => {
        const newAnswers = answers.slice();
        newAnswers.splice(index, 1);
        newAnswers.push("");
        newAnswers.pop();
        setAnswers(newAnswers);
    }
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    useEffect(() => {
        const newInputs = prop.inputs.slice();
        newInputs[prop.index].question = question;
        answers.forEach((string, i) => {
            newInputs[prop.index][`answer${i + 1}`] = string;
        })
        for (let i = answers.length; i < 4; i++) {
            newInputs[prop.index][`answer${i + 1}`] = "";
        }
        prop.setInputs(newInputs)
    }, [question, answers])

    return (
        <div className="form-group">
            <label htmlFor="question" id="quesnum">question number {prop.index + 1}</label><BsTrash cursor="pointer" onClick={prop.removeQue} />
            <input type="text" autoComplete="off" name="question" value={prop.inputs[prop.index].question} onChange={e => setQuestion(capitalizeFirstLetter(e.target.value))} className="form-control" id="exampleFormControlInput1" placeholder="Insert Question" />
            <div className="container answers">
                <div className="row row-cols-2">
                    {answers.map((a, index) =>
                        <div id="answerArea" key={'a' + index} className="col" >
                            <div className="input-group mb-3" >
                                <div className="input-group-prepend">
                                    <BsDashSquare color="#5F9EA0" cursor="pointer" fontSize="0.9rem" style={{ marginTop: "10px", marginRight: "3px" }} onClick={() => removeAns(index)} />
                                    <span className="input-group-text" id="basic-addon1">{index + 1}</span>
                                </div>
                                <input id="answerInput" type="text" name={`${index}`} autoComplete="off" value={prop.inputs[prop.index][`answer${index + 1}`]} onChange={typing} className="form-control answer-input" placeholder="Answer" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                        </div>
                    )}
                </div>
                <div className="plus-icon" style={{ textAlign: "end" }}>
                    <span>Add Answer</span><BsPlus color="green" cursor="pointer" onClick={addAns} />
                </div>
            </div>
        </div>
    )
}