import React, { useState, useEffect } from 'react';
import { BsTrash } from 'react-icons/bs';


export default function NewPollOneQue(prop) {

    const [question, setQuestion] = useState("")
    const [answer1, setAnswer1] = useState("")
    const [answer2, setAnswer2] = useState("")
    const [answer3, setAnswer3] = useState("")
    const [answer4, setAnswer4] = useState("")

    useEffect(() => {
        const newInputs = prop.inputs.slice()
        newInputs[prop.numOfQue - 1].question = question;
        newInputs[prop.numOfQue - 1].answer1 = answer1;
        newInputs[prop.numOfQue - 1].answer2 = answer2;
        newInputs[prop.numOfQue - 1].answer3 = answer3;
        newInputs[prop.numOfQue - 1].answer4 = answer4;
        prop.setInputs(newInputs)
    }, [question, answer1, answer2, answer3, answer4])

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className="form-group">
            <label htmlFor="question">question number {prop.numOfQue}</label><BsTrash onClick={prop.removeQue} />
            <input type="text" name="question" onChange={e => setQuestion(capitalizeFirstLetter(e.target.value))} className="form-control" id="exampleFormControlInput1" placeholder="Insert Question" />
            <div className="container answers">
                <div className="row">
                    <div className="col-sm">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">1</span>
                            </div>
                            <input type="text" name="answer1" onChange={e => setAnswer1(e.target.value)} className="form-control" placeholder="Answer" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">2</span>
                            </div>
                            <input type="text" name="answer2" onChange={e => setAnswer2(e.target.value)} className="form-control" placeholder="Answer" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">3</span>
                            </div>
                            <input type="text" name="answer3 " onChange={e => setAnswer3(e.target.value)} className="form-control" placeholder="Answer" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">4</span>
                            </div>
                            <input type="text" name="answer4" onChange={e => setAnswer4(e.target.value)} className="form-control" placeholder="Answer" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}