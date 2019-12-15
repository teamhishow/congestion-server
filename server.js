'use strict';
const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const path = require('path');

const max_congestion = 1000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.listen(8001);

let congestion_tables = {};

app.post('/', function(req, res) {
    console.log(
        "駅: " + req.body.station,
        "列車ID: " + req.body.train_id +
        "車両ID: " + req.body.car_id +
        "ドアID: "+ req.body.door_id +
        ", 混雑度: " + req.body.congestion +
        ", 時刻: " + req.body.time);
    if(!congestion_tables[req.body.train_id]) {
        congestion_tables[req.body.train_id] = {
            "station": req.body.station,
            "congestions": Array(10).fill().map(() => Array(4).fill(0)),
            "time": req.body.time
        }
    }
    //console.log(congestion_tables[req.body.train_id].congestions);
    congestion_tables[req.body.train_id].congestions[Number(req.body.car_id)][Number(req.body.door_id)] = Number(req.body.congestion);
    //console.log(congestion_tables[req.body.train_id].congestions);
    res.send('POST is sended.');
})

app.get('/congestions', function(req, res) {
    console.log("Query congestions");
    console.log(congestion_tables);
    res.send(JSON.stringify(congestion_tables));
})

app.get('/tokyo/trains/:train_id', function(req, res) {
    const train = req.params['train_id'];
    let congestion_rgb = Array(10).fill().map(() => Array(4).fill(0));
    let congestion_by_train = congestion_tables[train];
    console.log(congestion_by_train);

    for(const car_congestion_index in congestion_by_train.congestions) {
        const car_congestion = congestion_by_train.congestions[car_congestion_index];
        for(const door_congestion_index in car_congestion) {
            const door_congestion = car_congestion[door_congestion_index];
            //console.log(door_congestion);
            var gb = Math.min(235, Math.round(255 - 255 * (door_congestion / 1000.0)));
            //console.log(gb);
            var rgb = "ff" + componentToHex(gb) + componentToHex(gb);
            //console.log(componentToHex(gb));
            congestion_rgb[car_congestion_index - 1][door_congestion_index - 1] = rgb;
            console.log(congestion_rgb);
        }
    }
    console.log(congestion_rgb);
    res.render("index", {
        train_id: train,
        congestions: congestion_rgb,
        time: congestion_tables[train].time,
        station: congestion_tables[train].station
    });
})

app.use(express.static(path.join(__dirname, 'views')));

function componentToHex(c) {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
}
