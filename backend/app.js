const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const URL = require('./models/url');

const config = require("./config/database");
const url = require("./controllers/url");

mongoose.connect(config.database, (err, db) => {
    if (err)
        console.log("Error", err);
});

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res) => {
    res.send("Homepage URL");
})

app.get('/:id', (req,res) => {

    if(req.params.id !== "")
    {
        URL
            .findOne({ shortURL: req.params.id })
            .then(data=>{
                res.redirect(data.longURL);
            })
            .catch(err=>{
                res.redirect(`https://bunk.work`);
            });
    }
    else
    {
        res.redirect(`https://bunk.work`);
    }

})

app.use('/url',url);

app.listen(port, () => {
    console.log(`Starting the server at port ${port}`);
});

