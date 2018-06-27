const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const URL = require('../models/url');

//GET HTTP method
router.get('/', (req,res) => {
    res.send("GET");
});

//POST HTTP method
router.post('/', (req,res) => {
    res.send("POST");
});

//POST HTTP method
router.post('/create', (req,res) => {

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

//DELETE HTTP method. Here, we pass in a params which is the object id.
router.delete('/:id', (req,res)=> {
    res.send("DELETE");
})

module.exports = router;