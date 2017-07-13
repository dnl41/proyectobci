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
        this.timeSeries.forEach((signal) => {
         signal = Utils.filter.bandpass(signal);
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

    