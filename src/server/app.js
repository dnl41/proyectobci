'use strict';

const Constants = require('./constants');

const io = require('socket.io')(process.env.app_port || Constants.sockets.port);
const OpenBCIBoard = require('openbci').OpenBCIBoard;

const Modules = require('./modules'); 
const Connectors = require('./connection');
const Providers = require('./providers');



const Connector = new Connectors.Openbci_on ({
       verbose: true
});

const Signal = new Modules.Signal({ io });



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
    } 
    
    if (data=='detener') {
       Connector.stop();
    }
    
  });

  client.on('channel', function(data){
      Connector.channel(data);
    
  });
});





