'use strict';

const Utils = require('../utils');
const constants = require('../constants');

module.exports = class TimeSeries {
    
    constructor ({ Signal }) {
        this.signal = Signal;
        this.sampleRate = constants.sampleRate;
        this.bufferSize = constants.bufferSize;
        this.windowSize = constants.windowSize;
        this.timeline = Utils.data.generateTimeline(constants.time.timeline, constants.time.skip);
        this.timeSeries = [];
        this.amplitudes = [];
        this.averageSignals = [[],[]];
        this.subscribe();
    }
    
    subscribe () {
        this.signal.emitter.on('bci:signal', (signal) => {  
            this.timeSeries = signal;
            this.filter(); 
            this.offset();
            this.trim();
            this.signalToAmplitudes(signal);
            this.average();
            this.emit();
        });
    }

     filter () {

        this.timeSeries.forEach((signal,index) => {
            this.timeSeries[index] = Utils.filter.bandpass(this.timeSeries[index]);
            this.timeSeries[index] = Utils.filter.notch(this.timeSeries[index]);
        });
        
         /*this.timeSeries[0] = Utils.filter.bandpass(this.timeSeries[0]);
         this.timeSeries[1] = Utils.filter.bandpass(this.timeSeries[1]);
         this.timeSeries[2] = Utils.filter.bandpass(this.timeSeries[2]);
         this.timeSeries[3] = Utils.filter.bandpass(this.timeSeries[3]);
         this.timeSeries[4] = Utils.filter.bandpass(this.timeSeries[4]);
         this.timeSeries[5] = Utils.filter.bandpass(this.timeSeries[5]);
         this.timeSeries[6] = Utils.filter.bandpass(this.timeSeries[6]);
         this.timeSeries[7] = Utils.filter.bandpass(this.timeSeries[7]);*/   
    }

    
    offset () {
        this.timeSeries = this.timeSeries.map((channel, channelIndex) => {
            return channel.map((amplitude) => {
                return Utils.signal.offsetForGrid(amplitude, channelIndex,8, this.signal.scale); 
            });
        });
    }
    
    trim () {
        this.timeSeries.forEach((channel) => {
            channel = channel.splice(0, this.bufferSize - this.windowSize);
        });
    }
    
    signalToAmplitudes (signal) {
        this.amplitudes = signal.map((channel) => {
            let microvolts = Utils.signal.voltsToMicrovolts(channel[channel.length - 1])[0];
            return `${Math.round(microvolts)} ${constants.units.volts} `;
        });
    }
    average () {
        var a1 = 0;
        var a2 = 0;
        for (let i = 0; i < this.timeSeries[0].length; i++) { 
            for (let j = 0; j < 7; j+=2) { 
                a1 += this.timeSeries[j][i];  
            }
            this.averageSignals[0][i] = a1/4;
            a1=0;
            for (let k = 1; k < 8; k+=2) { 
              a2 += this.timeSeries[k][i]; 
            }
            this.averageSignals[1][i]=a2/4;
            a2=0;
        }
    }
    
    emit () {
        this.signal.io.emit('bci:time', {
            data: this.timeSeries,
            amplitudes: this.amplitudes,
            timeline: this.timeline,
            average: this.averageSignals
        });
    }
    
}

    