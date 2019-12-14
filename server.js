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

var congestion_tables = {};

congestion_tables = Array(10).fill().map(() => Array(4).fill(0));

app.post('/', function(req, res) {
    console.log("車両: " + req.body.car_id +
        "ドアID: "+ req.body.door_id +
        ", 混雑度: " + req.body.congestion +
        ", 時刻: " + req.body.time);
    congestion_tables[req.body.car_id][req.body.door_id] = Number(req.body.congestion);
    res.send('POST is sended.');
})

app.get('/congestions', function(req, res) {
    console.log("Query congestions");
    console.log(congestion_tables);
    res.send(JSON.stringify(congestion_tables));
})

app.get('/', function(req, res) {
    var congestion_rgb = congestion_tables;
    for(const car_congestion_index in congestion_tables) {
        const car_congestion = congestion_tables[car_congestion_index];
        for(const door_congestion_index in car_congestion) {
            const door_congestion = car_congestion[door_congestion_index];
            var gb = Math.min(20, Math.round(255 - 255 * (door_congestion / 1000.0)));
            //console.log(gb);
            var rgb = "ff" + componentToHex(gb) + componentToHex(gb);
            //console.log(rgb);
        }
    }
    res.render("index", {congestions: [[rgb, "ff4500"], ["ff6347", "ff0000"]]});
})

app.use(express.static(path.join(__dirname, 'views')));

function componentToHex(c) {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
}
