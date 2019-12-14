const noble = require('noble-mac');
//const uuid = 'baaaaaaabbbbccccddddeeeeeeeeeeee';
const uuid = 'AAAAAAAABBBBCCCCDDDDEEEEEEEEEEEE';
//const uuid = '222B4D44-A86A-4A44-B270-AB04311924F6';
const major = 12;
const minor = 34;
const measuredPower = -59;

noble.startScanning(uuid);
noble.on('discover', function(bleacon) {
   console.log(bleacon);
});
//noble.startAdvertising(uuid, major, minor, measuredPower);

