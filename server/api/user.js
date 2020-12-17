const { Router } = require('express');

const Poll = require('../mongoose.js');

const router = Router()

router.post('/history/recent', async (req, res) => {
    const polls = await Poll.find({ creator: req.body.creator }, null, { limit: 3, sort: { date: 'desc' } });
    const parsedPolls = polls.map(poll => {
        return {
            title: poll.title,
            explanation: poll.explanation,
            date: poll.date,
            _id: poll._id
        }
    })
    res.json(parsedPolls);
});

router.post('/history/all', async (req, res) => {
    const polls = await Poll.find({ creator: req.body.creator });
    const parsedPolls = polls.map(poll => {
        return {
            title: poll.title,
            explanation: poll.explanation,
            date: poll.date,
            _id: poll._id
        }
    })
    res.json(parsedPolls);
});

module.exports = router