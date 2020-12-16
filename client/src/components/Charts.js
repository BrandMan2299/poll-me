import React, { useEffect, useState } from 'react'
import { PieChart, Pie, BarChart, Bar, Tooltip, ResponsiveContainer, Cell, Legend, CartesianGrid, XAxis, YAxis } from 'recharts';

export default function Charts({ question }) {
    const [data, setData] = useState([]);
    const colors = ["#a0e1db", "#8dd5ff", "#ace49d", "#88d496"]

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
            <ResponsiveContainer width="50%" height={250}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="answer" />
                    <YAxis dataKey="votes" />
                    <Tooltip />
                    <Legend wrapperStyle={{ bottom: 0, left: 25 }} />
                    <Bar dataKey="votes" fill="#a0e1db" />
                </BarChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="50%" height={250}>
                <PieChart >
                    <Tooltip />
                    <Legend />
                    <Pie data={data} dataKey="votes" nameKey="answer" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" >
                        {
                            data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index]} />
                            ))
                        }
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}