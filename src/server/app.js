'use strict';
 

const io = require('socket.io')(process.env.app_port || 8080);

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
      io.emit('bci:pura',data)
      Signal.buffer(data);
      });
      console.log(data);
    } 
    
    if (data=='detener') {
       console.log(data);
       Conector.stop();
    }
    
  });
});





