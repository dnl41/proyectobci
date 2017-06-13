'use strict';
 
//const constants = require('./constants'); 
const io = require('socket.io')(process.env.app_port || 8080);

//const Connectors = require('./connectors');
const EnvioSeñal = require('./EnvioSeñal');
const Modules = require('./modules'); 
var Conectores = require('./conexion');

var Conector = new Conectores.Openbci_on ({
       verbose: true
});


const Signal = new EnvioSeñal.Signal({ io });
//const Motion = new Providers.Motion({ io });

Conector.start().then(() => {
   //  const FFT = new Modules.FFT({ Signal });
    //const Topo = new Modules.Topo({ Signal });
    const TimeSeries = new Modules.TimeSeries({ Signal });
});

Conector.stream((data) => {
	(data.channelData[0])= (data.channelData[0]*1000).toFixed(4);
	io.emit('bci:time',data)
    //Signal.buffer(data);
    //Motion.capture(data);
    
   console.log(data.channelData[0]);
   var waitTill = new Date(new Date().getTime() + 100);
  while(waitTill > new Date()){}
  	
  console.log(data.channelData[0]);
});

process.on('SIGINT', Conector.stop);

