'use strict';
const bodyParser = require('body-parser')
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(8001);

app.post('/', function(req, res) {
    console.log("ドアID: "+ req.body.door_id + ", 混雑度: " + req.body.conjestion);
    res.send('POST is sended.');
})
