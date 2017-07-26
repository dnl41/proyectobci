'use strict';

const EventEmitter = require('events');
const Utils = require('../utils');
//const constants = require('../constants');

class SignalEmitter extends EventEmitter {}

module.exports = class Signal {
    
    constructor ({ io }) {
        this.io = io;
        this.emitter = new SignalEmitter();
        this.bufferSize = 256;
        this.windowSize = 32;
        this.sampleRate = 250;
        this.signals = [[],[],[],[],[],[],[],[]];
        this.sampleNumber = 0;
        this.init();
    }
    
    init () {
        this.io.on('connection', (socket) => {
             socket.on('bci:filter', (filter) => {
              Utils.filter.apply(filter);
             });
        });
        
        this.setScale();
        
    }
    
    buffer (sample) {
        this.sampleNumber++;
        this.add(sample);
       
        if (this.sampleNumber === this.bufferSize) {
            this.emitter.emit('bci:signal', [...this.signals]);
            this.window();
        }


    }
    
    add (sample) {
        //console.log('sample', sample);
        Object.keys(sample.channelData).forEach((channel, i) => {
            this.signals[i].push(sample.channelData[channel]);
            //////////////////////////////////////////
           // console.log("Channel " + (i + 1) + ": " + sample.channelData[i].toFixed(8) + " Volts.");
            //////////////////////////////////////////
        });
    }
    
    window () {
        this.signals = this.signals.map((channel) => {
            return channel.filter((signal, index) => {
                return index > (this.windowSize - 1);
            });
        });
        this.sampleNumber = this.bufferSize - this.windowSize;
    }
    
    setScale () {
        if (Utils.signal.isSimulated) {
            this.scale = 3;
        }else {
            this.scale = 1;
        }
    }
    
}
