'use strict';

const constants = require('./constants');
const io = require('socket.io')( constants.sockets.port);
const OpenBCIBoard = require('openbci').OpenBCIBoard;
const Connectors = require('./connection');
const Modules = require('./modules'); 

const Connector = new Connectors.Openbci_on ({
       verbose: true
});

const Signal = new Modules.Signal({ io });
const SendMcu = new Modules.NET ({});

io.on('connection', function(client){
  client.on('openbci', function(data){
    if (data=='inicio') {
      Connector.start().then(() => {
         const FFT = new Modules.FFT({ Signal });
         const TimeSeries = new Modules.TimeSeries({ Signal });
      });
      Connector.stream((data) => {
          Signal.buffer(data);
      });
    }; 
    if (data=='detener') {
       Connector.stop();
    };
  });
  client.on('channel', function(data){
     
    if (data=='blink') {
       SendMcu.send();
    }else{
      console.log(data);
     let [CH,value]=data.split(':');
     constants.stateCh[CH]=value;
    Connector.channel(data);
    }
  });
});







