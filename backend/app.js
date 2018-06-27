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

app.use('/url',url);

app.get('/:id', (req,res) => {

    URL.findOneAndUpdate({ shortURL: req.params.id }, {$inc: { accessCounts: 1 }})
        .then(data=>{
            if(data.timeOfDeletion > Math.floor(Date.now()/1000))
            {
                res.redirect(data.longURL);
            }
            else
            {
                URL.findOneAndRemove({ shortURL: data.shortURL })
                    .then(()=>{res.redirect(`https://bunk.work`)})
                    .catch(()=>{res.send(`Could not remove URL`)});
            }
        })
        .catch(err=>{
            res.redirect(`https://bunk.work`);
        });

})

app.listen(port, () => {
    console.log(`Starting the server at port ${port}`);
});

