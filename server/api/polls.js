const { Router } = require('express');

const Poll = require('../mongoose.js');

const router = Router()

router.post('/', async (req, res) => {
    const data = req.body;
    const poll = new Poll(data);
    await poll.save();
    const id = (await Poll.findOne({ date: data.date }))._id
    res.json(id)
})

router.get('/admin/:id', async (req, res) => {
    const data = await Poll.findOne({ _id: req.params.id });
    res.json(data);
})

router.route('/:id')
    .get(async (req, res) => {
        const data = await Poll.findOne({ _id: req.params.id });
        data.questions.forEach(q => {
            q.votes1 = 0;
            q.votes2 = 0;
            q.votes3 = 0;
            q.votes4 = 0;
        })
        res.json(data);
    })
    .post(async (req, res) => {
        const data = req.body;
        const poll = await Poll.findOne({ _id: req.params.id });
        data.forEach((answer, index) => {
            const numberVote = `votes${answer}`;
            poll.questions[index][numberVote]++;
        });
        await Poll.updateOne({ _id: poll._id }, poll)
        res.json("good")
    })

module.exports = router