var argv = require('yargs').argv;
var OpenBCIBoard = require('openbci').OpenBCIBoard;
var OpenBCI = require('openbci-sdk');

module.exports = class Openbci_on  extends OpenBCIBoard {
   
   constructor (options) {
        super(options); 
    }
   start () { 
        return new Promise((resolve, reject) => {

            
            var onConnect = () => {
                this.on('ready', () => {
                    this.streamStart();
                    resolve();
                });
            };
            
            this.autoFindOpenBCIBoard()
                .then((portName) => {
                    if (portName) {
                        this.connect(portName).then(onConnect);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    if (!!(argv._[0] && argv._[0] === 'simulate')) {
                       this.connect(OpenBCI.OpenBCIConstants.OBCISimulatorPortName)
                      .then(onConnect);
                    }else {
                        reject(error);
                    }
                });
            
         });
    }      

   stop () {
        this.streamStop().then(() => {
            this.removeAllListeners();
            this.disconnect().then(() => {
               // process.exit();
            });
        });
    }

    channel (ch) {

        let [CH,value]=ch.split(':');
        var numero = parseInt(CH);
        if(value=='true'){
            this.channelOn(numero);

        }else{
            this.channelOff(numero);

        }     
    }

    stream (callback) {
        this.on('sample', callback);
    }
}