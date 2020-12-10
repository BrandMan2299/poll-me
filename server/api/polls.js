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

router.get('/:id', async (req, res) => {
    const data = await Poll.findOne({ _id: req.params.id });
    res.json(data);
})

module.exports = router