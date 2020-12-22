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

router.post('/results/:id', async (req, res) => {
    const { creator } = req.body;
    const poll = await Poll.findOne({ _id: req.params.id });
    if (creator === poll.creator) {
        res.json(poll);
    }
    else {
        res.json({ error: "stop messing around" })
    }
});

router.route('/:id')
    .get(async (req, res) => {
        const data = await Poll.findOne({ _id: req.params.id });
        data.questions = data.questions.map(q => {
            return {
                question: q.question,
                answer1: q.answer1,
                answer2: q.answer2,
                answer3: q.answer3,
                answer4: q.answer4,
            }
        })
        res.json(data);
    })
    .post(async (req, res) => {
        const data = req.body;
        const poll = await Poll.findOne({ _id: req.params.id });
        data.forEach((answer, index) => {
            if (!isNaN(answer)) {
                const numberVote = `votes${answer}`;
                poll.questions[index][numberVote]++;
            }
            else {
                poll.questions[index].openReplies.push(answer)
            }
        });
        await Poll.updateOne({ _id: poll._id }, poll)
        res.json("good")
    });
module.exports = router