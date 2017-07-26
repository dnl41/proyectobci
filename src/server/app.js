'use strict';
 

const io = require('socket.io')(process.env.app_port || 8080);
var OpenBCIBoard = require('openbci').OpenBCIBoard;

const Modules = require('./modules'); 
var Conectores = require('./conexion');
const Providers = require('./providers');
const Envio = require('./Envio');

var Conector = new Conectores.Openbci_on ({
       verbose: true
});


const Signal = new Envio.Signal({ io });

io.on('connection', function(client){
  client.on('openbci', function(data){
    if (data=='inicio') {

      Conector.start().then(() => {
         const FFT = new Modules.FFT({ Signal });
         const TimeSeries = new Modules.TimeSeries({ Signal });
      });

      Conector.stream((data) => {
          Signal.buffer(data);
      });
    } 
    
    if (data=='detener') {
       Conector.stop();
    }
    
  });

  client.on('channel', function(data){
      Conector.channel(data);
    
  });
});





