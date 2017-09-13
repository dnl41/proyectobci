'use strict';
var argv = require('yargs').argv;

const EventEmitter = require('events');
const constants = require('../constants');
const Utils = require('../utils');

class SignalEmitter extends EventEmitter {}

module.exports = class Signal {
    
    constructor ({ io }) {
        this.io = io;
        this.emitter = new SignalEmitter();
        this.bufferSize = constants.signal.bufferSize;
        this.windowSize = constants.signal.windowSize;
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
        if(constants.print.flag){console.log('sample', sample);}
        
        Object.keys(sample.channelData).forEach((channel, i) => {
            this.signals[i].push(sample.channelData[channel]);
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
        if (Utils.signal.isSimulated()) {
            this.scale = constants.scale.simulated;
        } else {
            this.scale = constants.scale.global;
        }
    }
    
}
