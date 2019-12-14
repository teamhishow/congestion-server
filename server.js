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
let congestion_tables_time = [];

app.post('/', function(req, res) {
    console.log("車両: " + req.body.car_id +
        "ドアID: "+ req.body.door_id +
        ", 混雑度: " + req.body.congestion +
        ", 時刻: " + req.body.time);
    console.log(req.body.car_id + ":" + req.body.door_id);
    if(congestion_tables_time[req.body.time]) {
        congestion_tables_time[req.body.time][Number(req.body.car_id)][Number(req.body.door_id)] = Number(req.body.congestion);
    }else{
        congestion_tables_time[req.body.time] = Array(10).fill().map(() => Array(4).fill(0));
        congestion_tables_time[req.body.time][Number(req.body.car_id)][Number(req.body.door_id)] = Number(req.body.congestion);

    }
    //console.log(congestion_tables);
    res.send('POST is sended.');
})

app.get('/congestions', function(req, res) {
    console.log("Query congestions");
    console.log(congestion_tables);
    res.send(JSON.stringify(congestion_tables));
})

app.get('/', function(req, res) {
    //console.log(congestion_tables);
    let congestion_rgb = Array(10).fill().map(() => Array(4).fill(0));
    for(const car_congestion_index in congestion_tables) {
        const car_congestion = congestion_tables[car_congestion_index];
        for(const door_congestion_index in car_congestion) {
            const door_congestion = car_congestion[door_congestion_index];
            //console.log(door_congestion);
            var gb = Math.min(235, Math.round(255 - 255 * (door_congestion / 1000.0)));
            console.log(gb);
            var rgb = "ff" + componentToHex(gb) + componentToHex(gb);
            //console.log(componentToHex(gb));
            congestion_rgb[car_congestion_index][door_congestion_index] = rgb;
        }
    }
    console.log(congestion_rgb);
    res.render("index", {congestions: congestion_rgb});
})

app.use(express.static(path.join(__dirname, 'views')));

function componentToHex(c) {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
}
