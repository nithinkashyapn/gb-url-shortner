const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const URL = require('../models/url');

router.get('/:id', (req,res) => {
    res.sendFile(__dirname + '/public/verify.html');
});

router.post('/verify', (req,res) => {

    let body = req.body;
    console.log(body);

    URL.find({shortURL: body.endpoint})
    .then((urlFound)=>{
        if(urlFound.length > 0)
        {
            console.log(urlFound[0].longURL, urlFound[0].privateOrPublic, body.passcode );
            if(urlFound[0].privateOrPublic === body.passcode) res.status(200).json({ message: urlFound[0].longURL})
            else res.status(400).json({ error: `Password does not match` })
        }
        else{
            res.status(400).json({ error: `URL does not exist` })
        }
    })
    .catch(()=>{
        res.status(400).json({ error: 'Wrong' })
    })

    if(validUrl.isUri(body.longURL))
    {
        let data = {
            shortURL: body.shortURL,
            longURL: body.longURL
        };

        URL.create(data, function (err, small){
            if (err) res.send("Didn't create a URL");
            else res.status(200).send("Created a url");
        });
    }

});

module.exports = router;