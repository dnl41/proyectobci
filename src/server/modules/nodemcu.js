'use strict';

var net = require('net');
const constants = require('../constants');

module.exports = class NET {
    
    constructor () {
         net.createServer(function (socket) {
            console.log("conectado");
            if (!constants.Mcu.send) {
                console.log("si");
                constants.Mcu.send = true;
            };
            socket.on('end', function () {
                this.socket.write("Thank you");
            });
         }).listen(3000);
    }   
}
   