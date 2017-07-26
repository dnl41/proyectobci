'use strict';

const Utils = require('../utils');
const constants = require('../constants');

module.exports = class TimeSeries {
    
    constructor ({ Signal }) {
        this.signal = Signal;
        this.sampleRate = 250;
        this.bufferSize = 256;
        this.windowSize = 32;
        this.timeline = Utils.data.generateTimeline(constants.time.timeline, constants.time.skip, constants.units.seconds);
        this.timeSeries = [];
        this.amplitudes = [];
        this.subscribe();
    }
    
    subscribe () {
        this.signal.emitter.on('bci:signal', (signal) => {  
            this.timeSeries = signal;

            this.filter();
            this.offset();

            this.trim();
            this.signalToAmplitudes(signal);
            this.emit();
        });
    }
    
    offset () {
        this.timeSeries = this.timeSeries.map((channel, channelIndex) => {
            return channel.map((amplitude) => {
                return Utils.signal.offsetForGrid(amplitude, channelIndex,8, this.signal.scale); 
            });
        });
    }
    
    filter () {

        this.timeSeries.forEach((signal,index) => {
            this.timeSeries[index] = Utils.filter.bandpass(this.timeSeries[index]);
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

    
    trim () {
        this.timeSeries.forEach((channel) => {
            channel = channel.splice(0, this.bufferSize - this.windowSize);
        });
    }
    
    signalToAmplitudes (signal) {
        this.amplitudes = signal.map((channel) => {
            let microvolts = Utils.signal.voltsToMicrovolts(channel[channel.length - 1])[0];
            return `${Math.round(microvolts)} `;
        });
    }
    
    emit () {
        this.signal.io.emit('bci:time', {
            data: this.timeSeries,
            amplitudes: this.amplitudes,
            timeline: this.timeline
        });
    }
    
}

    