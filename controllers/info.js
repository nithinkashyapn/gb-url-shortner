const express = require('express');
const router = express.Router();
const URL = require('../models/url');
const CONSTANT = require('../config/constant');
const path = require('path');

router.get('/:id', (req,res) => {

    res.set('Content-Type', 'text/html');
    var responseHTML = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><title>URL Shortner</title><link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.css"><style>body { padding-top:50px; }</style></head><body>`;
    responseHTML += `<div class="container" style="text-align:center; word-wrap: break-word;"><p><pre><code><u>Logs</u><br><br>`

    URL.find({shortURL: req.params.id})
    .then((urlFound)=>{
        if(urlFound.length > 0)
        {
            responseHTML += ` Long URL is <a href="${urlFound[0].longURL}">this</a> <br> Short URL is ${CONSTANT.domain}${urlFound[0].shortURL} <br> It was accessed ${urlFound[0].accessCounts} times <br> Created on ${new Date(urlFound[0].timeOfCreation * 1000)} <br> and will expire on ${new Date(urlFound[0].timeOfDeletion * 1000)}`;
            responseHTML += `</code></pre></p></div></body></html>`
            res.send(new Buffer(responseHTML));
        }
        else{
            responseHTML += ` URL does not exist `;
            responseHTML += `</code></pre></p></div></body></html>`
            res.send(new Buffer(responseHTML));
        }
    })
    .catch(()=>{
        responseHTML += ` Something went wrong `;
        responseHTML += `</code></pre></p></div></body></html>`
        res.send(new Buffer(responseHTML));
    });

});

router.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname + '/../public/404.html'));
})

module.exports = router;
