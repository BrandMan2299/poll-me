import React, { useEffect, useState } from 'react'
import { PieChart, Pie, BarChart, Bar, Tooltip, Cell, Legend, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';

export default function Charts({ question }) {
    const [data, setData] = useState([]);
    const colors = ["#696969", "#ADD8E6", "#20B2AA", "#008080"]

    useEffect(() => {
        const array = []
        array.push({
            answer: question.answer1,
            votes: question.votes1
        })
        array.push({
            answer: question.answer2,
            votes: question.votes2
        })
        array.push({
            answer: question.answer3,
            votes: question.votes3
        })
        array.push({
            answer: question.answer4,
            votes: question.votes4
        })
        setData(array);
    }, [])

    return (
        <div style={{ display: "flex" }}>
            <ResponsiveContainer width="50%" height={400}>
                <BarChart width={400} height={10} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <YAxis />
                    <XAxis dataKey="answer" />
                    <Bar dataKey="votes" fill="#5F9EA0" />
                    <Legend />
                    <Tooltip />
                </BarChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="50%" height={400}>
                <PieChart width={400} height={250}>
                    <Tooltip />
                    <Legend />
                    <Pie data={data} dataKey="votes" nameKey="answer" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}
