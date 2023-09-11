const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

router.post('/addemployee', async (req, res) => {
    let { name, email, phone } = req.body;
    await Person.create({ Email: email, name: name, Phone: phone });
    res.status(200).json({ msg: "new quote added" })
})

router.get('/employee', async (req, res) => {
    try {
        let allPerson = await Person.find({});
        res.status(200).json(allPerson);
    }
    catch (e) {
        res.status(400).json({ msg: "something went wrong" });
    }
})

router.get('/employee/:id', async (req, res) => {
    try {
        console.log(req.params.id)
        let allPerson = await Person.findById(req.params.id);
        res.status(200).json(allPerson);
    }
    catch (e) {
        res.status(400).json({ msg: "something went wrong" });
    }
})

router.put('/employee/:id', async (req, res) => {
    try {
        let { name, email, phone } = req.body;
        let allPerson = await Person.findByIdAndUpdate(req.params.id, { Email: email, name: name, Phone: phone });
        res.status(200).json(allPerson);
    }
    catch (e) {
        res.status(400).json({ msg: "something went wrong" });
    }
})


router.delete('/employee/:id', async (req, res) => {
    try {
        console.log(req.params.id)
        await Person.deleteOne({ _id: req.params.id })
        res.status(200).json({ msg: " data deleted" })
    }
    catch (e) {
        res.status(400).json({ msg: "something went wrong" });
    }
})


module.exports = router;



