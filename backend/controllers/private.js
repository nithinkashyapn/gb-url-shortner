const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const URL = require('../models/url');

router.get('/:id', (req,res) => {
    res.sendFile(__dirname + '/public/verify.html');
});

router.post('/verify', (req,res) => {

    let body = req.body;

    if(validUrl.isUri(body.longURL))
    {
        let data = {
            shortURL: body.shortURL,
            longURL: body.longURL
        };

        URL.create(data, function (err, small){
            if (err) res.send("Didn't create a URL");
            else res.send("Created a url");
        });
    }
    else
    {
        res.send("The input is not a valid URL");
    }

});

module.exports = router;