'use strict';

const dsp = require('dsp.js');
const Utils = require('../utils');
//const constants = require('../constants');

module.exports = class FFT {
    
    constructor ({ Signal }) {
        this.signal = Signal;
        this.bins = 256;
        this.bufferSize = 256;
        this.sampleRate = 250;
        this.bands = {delta: [1, 3], theta: [4, 8], alpha: [8, 12], beta: [13, 30], gamma: [30, 100]};
        this.spectrums = [[],[],[],[],[],[],[],[]];
        this.byBand = [];
        this.labels = [];
        this.subscribe();
    }
        
    subscribe () {
        this.signal.emitter.on('bci:signal', (signals) => {        
            this.signalsToFFT(signals);
            this.scaleLabels();
            this.filterBands();
            this.filterLabels();
            this.emit(); 
        });
    }
    
    signalsToFFT (signals) {
        signals.forEach((signal, index) => {
            signal = Utils.filter.process(signal);
            let fft = new dsp.FFT(this.bufferSize, this.sampleRate);
            fft.forward(signal);
            this.spectrums[index] = Utils.data.parseObjectAsArray(fft.spectrum);
            this.spectrums[index] = Utils.signal.voltsToMicrovolts(this.spectrums[index], true);
        });
    }
    
    scaleLabels () {
        this.labels = new Array(this.bins / 2).fill()    
            .map((label, index) => {
                return Math.ceil(index * (this.sampleRate / this.bins));
            });
    }
    
    filterBands () {
        for (let band in this.bands) {
            this.byBand[band] = Utils.filter.filterBand(this.spectrums, this.labels, this.bands[band]);
        }
    }
    
    filterLabels () {
        // Skip every 8, add uni (too many labels issue)
        this.labels = this.labels.map((label, index, labels) => {
            let eighth = index % 4 === 0;
            let last = index === (labels.length - 1);
            return eighth || last ? `${label} ${constants.units.hertz}` : ``;
        });
    }
    
    emit () {
        this.signal.io.emit('bci:fft', {
            data: this.spectrums,
            labels: this.labels,
            theta: this.byBand.theta.spectrums,
            delta: this.byBand.delta.spectrums,
            alpha: this.byBand.alpha.spectrums,
            beta: this.byBand.beta.spectrums,
            gamma: this.byBand.gamma.spectrums
        });
    }
    
}
   