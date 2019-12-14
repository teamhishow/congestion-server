'use strict';
const bodyParser = require('body-parser')
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(8001);

app.post('/', function(req, res) {
    // リクエストボディを出力
    console.log(req.body.foo);
    res.send('POST is sended.');
})
