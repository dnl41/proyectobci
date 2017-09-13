'use strict';

const Utils = require('../utils');
const constants = require('../constants');

module.exports = class TimeSeries {
    
    constructor ({ Signal }) {

        this.bufferSize = constants.signal.bufferSize;
        this.windowSize = constants.signal.windowSize;
        this.signal = Signal;
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
            this.average();
            this.scaleSignal();
            this.signalToAmplitudes(signal);
            this.offset();
            this.trim();
            
            this.emit();
        });
    }

    filter () {
        this.timeSeries.forEach((signal,index) => {
            this.timeSeries[index] = Utils.filter.bandpass(this.timeSeries[index]);
            this.timeSeries[index] = Utils.filter.notch(this.timeSeries[index]);
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
            this.averageSignals[1][i]=(a2/4)+(0.0001);
            a2=0;
        }
        this.averageSignals = this.averageSignals.map((channel, channelIndex) => {
            return channel.map((amplitude) => {
                return Utils.signal.scaleForGrid (amplitude, this.signal.scale); 
            });
        });
    }

    scaleSignal(){
        this.timeSeries = this.timeSeries.map((channel, channelIndex) => {
            return channel.map((amplitude) => {
                return Utils.signal.scaleForGrid (amplitude, this.signal.scale); 
            });
        });
    }

    signalToAmplitudes (signal) {
        this.amplitudes = this.timeSeries.map((channel) => {
           
           // let microvolts = Utils.signal.voltsToMicrovolts(channel[channel.length - 1])[0];
            let microvolts = Utils.signal.voltsToMicrovolts(channel[channel.length - 1])[0];

            return `${(microvolts.toFixed(2))} ${constants.units.volts} `;
        });
    }

    offset () {
        this.timeSeries = this.timeSeries.map((channel, channelIndex) => {
            return channel.map((amplitude) => {
                return Utils.signal.offsetForGrid(amplitude, channelIndex); 
            });
        });
    }
    
    trim () {
        this.timeSeries.forEach((channel) => {
            channel = channel.splice(0, this.bufferSize - this.windowSize);
        });
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

    