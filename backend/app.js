const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

const config = require("./config/database");
const url = require("./controllers/url");

mongoose.connect(config.database);

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res) => {
    res.send("Invalid page");
})

app.use('/url',url);

app.listen(port, () => {
    console.log(`Starting the server at port ${port}`);
});

