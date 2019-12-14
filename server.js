'use strict';
const bodyParser = require('body-parser')
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(8001);

app.post('/', function(req, res) {
    // リクエストボディを出力
    console.log("ドアID: \t" + req.body.door_id);
    console.log("混雑度: \t" + req.body.conjestion);
    res.send('POST is sended.');
})
