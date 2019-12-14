'use strict';
const bodyParser = require('body-parser')
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(8001);

var congestion_tables = {};

app.post('/', function(req, res) {
    console.log("ドアID: "+ req.body.door_id + ", 混雑度: " + req.body.congestion + ", 時刻: " + req.body.time);
    congestion_tables[req.body.door_id] = req.body.congestion;
    res.send('POST is sended.');
})

app.get('/congestions', function(req, res) {
    console.log("Query congestions");
    console.log(congestion_tables);
    res.send(JSON.stringify(congestion_tables));
})
