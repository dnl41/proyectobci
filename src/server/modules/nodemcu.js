'use strict';

var net = require('net');
const constants = require('../constants');
var port = 3000;
var client = new net.Socket();

module.exports = class NET {
    constructor () {
    };  

    send(){
        client.connect(port, '192.168.1.1', function() {
            console.log('blink');
            client.write('blink');
            client.destroy();
        });

    };
};

   