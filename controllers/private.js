const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const path = require('path');
const URL = require('../models/url');

router.get('/:id', (req,res) => {
    res.sendFile(path.resolve(__dirname + '/../public/verify.html'));
});

router.post('/verify', (req,res) => {

    let body = req.body;
    URL.find({shortURL: body.endpoint})
    .then((urlFound)=>{
        if(urlFound.length > 0)
        {
            if(urlFound[0].privateOrPublic === body.passcode) res.status(200).json({ message: urlFound[0].longURL})
            else res.status(400).json({ error: `Password does not match` })
        }
        else{
            res.status(400).json({ error: `URL does not exist` })
        }
    })
    .catch(()=>{
        res.status(400).json({ error: 'Wrong' })
    });

});

module.exports = router;