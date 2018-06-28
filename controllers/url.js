const express = require('express');
const router = express.Router();
const shortid = require('clean-shortid');
const validUrl = require('valid-url');

const URL = require('../models/url');
const CONSTANT = require('../config/constant');

//POST HTTP method
router.post('/create', (req,res) => {

    let body = req.body;
    URL.find({shortURL: body.shortURL})
    .then((urlFound)=>{
        if(urlFound.length > 0)
        {
            res.status(400).json({ error: 'URL already exists' })
        }
        else 
        {
            if(validUrl.isUri(body.longURL))
            {
                let data = {
                    shortURL: body.shortURL ? body.shortURL : shortid.generate(),
                    longURL: body.longURL,
                    timeOfDeletion: body.timeOfDeletion ? Math.floor(Date.now()/1000 + (body.timeOfDeletion * 86400)) : Math.floor(Date.now()/1000 + 2629743),
                    privateOrPublic: body.privateOrPublic ? body.privateOrPublic : "mV6Bi0deXgRkHVFu2ZNT0btmcIwGtNtG"
                };
        
                URL.create(data, function (err, mongodata){
                    if (err) res.status(400).json({ error: 'Could not create URL' })
                    else res.status(200).json({ message: `${CONSTANT.domain}` + mongodata.shortURL})
                });
            }
            else
            {
                res.status(400).json({ error: 'Not a valid URL' })
            }
        }
    })
    .catch((err)=>{
        res.status(400).json({ error: 'Something went wrong' })
    });

});

module.exports = router;