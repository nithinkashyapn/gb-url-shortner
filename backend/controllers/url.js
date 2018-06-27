const express = require('express');
const router = express.Router();
const shortid = require('clean-shortid');
const validUrl = require('valid-url');

const URL = require('../models/url');

//POST HTTP method
router.get('/', (req,res) => {
    res.send("Whom");
});

//POST HTTP method
router.post('/create', (req,res) => {

    let body = req.body;
    console.log(body);
    URL.find({shortURL: body.shortURL})
    .then((urlFound)=>{
        if(urlFound.length > 0)
        {
            res.send("URL already exists");
        }
        else 
        {
            if(validUrl.isUri(body.longURL))
            {
                let data = {
                    shortURL: body.shortURL ? body.shortURL : shortid.generate(),
                    longURL: body.longURL,
                    timeOfDeletion: body.timeOfDeletion ? Math.floor(Date.now()/1000 + (body.timeOfDeletion * 86400)) : Math.floor(Date.now()/1000 + 2629743),
                    privateOrPublic: body.privateOrPublic ? body.privateOrPublic : "public"
                };
        
                URL.create(data, function (err, data){
                    if (err) res.send("Could not create a URL")
                    else res.send("Created a url");
                });
            }
            else
            {
                res.send("The input is not a valid URL");
            }
        }
    })
    .catch((err)=>{
        res.send("Errored!")
    });

});

module.exports = router;