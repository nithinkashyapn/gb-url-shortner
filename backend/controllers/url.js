const express = require('express');
const router = express.Router();

const URL = require('../models/url');

//GET HTTP method
router.get('/',(req,res) => {
    res.send("GET");
});

//POST HTTP method
router.post('/', (req,res,next) => {
    res.send("POST");
});

//POST HTTP method
router.post('/create', (req,res,next) => {
    res.send("POST in CREATE");
});

//DELETE HTTP method. Here, we pass in a params which is the object id.
router.delete('/:id', (req,res,next)=> {
    res.send("DELETE");
})

module.exports = router;