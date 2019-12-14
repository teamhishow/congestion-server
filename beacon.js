Bleacon = require('bleacon');
const uuid = 'aaaaaaaabbbbccccddddeeeeeeeeeeee';
//const uuid = 'AAAAAAAABBBBCCCCDDDDEEEEEEEEEEEE';
//const uuid = '222B4D44-A86A-4A44-B270-AB04311924F6';
const major = 12;
const minor = 34;
const measuredPower = -59;

Bleacon.startScanning(uuid);
Bleacon.on('discover', function(bleacon) {
   console.log(bleacon);
});
Bleacon.startAdvertising(uuid, major, minor, measuredPower);

