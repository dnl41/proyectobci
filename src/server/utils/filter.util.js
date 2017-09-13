'use strict';

var Fili = require('fili');
const constants = require('../constants');

module.exports = {

    state: {
        BANDPASS: '1-50',
        NOTCH: '60',
       // VERTSCALE: '50',
        //VERTALGO: 'LOG',
        //SMOOTH: '0-75',
        //POLARITY: 'YES',
        //MAXFREQUENCY: '60'
    },    
    
    apply (filter) {
        if (!filter) return;
        let [id, value] = filter.split(':');
        this.state[id] = value;
    },
    
    process (signal) {
        Object.keys(this.state).forEach((key) => {
            let filter = key.toLowerCase();
            if (filter in this && typeof this[filter] === 'function') {
                // @TODO: apply all filters dynamically
                signal = this[filter](signal);
            }
        });
        signal = this.notch(signal);
        return signal;
    },
    
    
    notch (signal) {
        if (this.state.NOTCH === 'NONE') return signal;
        var notchValue = parseInt(this.state.NOTCH);
        var iirCalculator = new Fili.CalcCascades();
        var notchFilterCoeffs = iirCalculator.bandstop({
            order: 2, // cascade 3 biquad filters (max: 12)
            characteristic: 'butterworth',
            Fs: constants.signal.sampleRate, // sampling frequency 250hz
            Fc: notchValue,
            F1: notchValue - 1,
            F2: notchValue + 1,
            gain: 0, // gain for peak, lowshelf and highshelf
            preGain: false // adds one constant multiplication for highpass and lowpass
            // k = (1 + cos(omega)) * 0.5 / k = 1 with preGain == false
        });
        var notchFilter = new Fili.IirFilter(notchFilterCoeffs);
        return notchFilter.multiStep(signal);
    },
    
    bandpass (signal) {
        if (this.state.BANDPASS === 'NONE') return signal;
        let [F1, F2] = this.state.BANDPASS.split('-');
        var f1=parseInt(F1);
        var f2=parseInt(F2);

        var iirCalculator = new Fili.CalcCascades();
        var availableFilters = iirCalculator.available();

        var lpFilterCoeffs = iirCalculator.lowpass({
            order: 3, // cascade 3 biquad filters (max: 12)
            characteristic: 'butterworth',
            Fs: constants.signal.sampleRate, // sampling frequency
            Fc: f2,
            gain: 0, // gain for peak, lowshelf and highshelf
            preGain: false // adds one constant multiplication for highpass and lowpass
            // k = (1 + cos(omega)) * 0.5 / k = 1 with preGain == false
        });
        var lpFilter = new Fili.IirFilter(lpFilterCoeffs);
        this.signal = lpFilter.multiStep(signal);
        var iirCalculator = new Fili.CalcCascades();
        var hpFilterCoeffs = iirCalculator.highpass({
            order: 3, // cascade 4 biquad filters (max: 12)
            characteristic: 'butterworth',
            Fs: constants.signal.sampleRate, // sampling frequency
            Fc: f1,
            gain: 0, // gain for peak, lowshelf and highshelf
            preGain: false // adds one constant multiplication for highpass and lowpass
            //k = (1 + cos(omega)) * 0.5 / k = 1 with preGain == false
        });
        var hpFilter = new Fili.IirFilter(hpFilterCoeffs);
        return hpFilter.multiStep(signal);
    },
    
    filterBand (spectrums, labels, range) {
        if (!spectrums ) return console.log('Please provide spectrums');
        spectrums = spectrums.map(function (channel) {
            return channel.filter(function (spectrum, index) {
                return labels[index] >= range[0] && labels[index] <= range[1];
            });
        });
        spectrums = [spectrums.map(function (channel) {
            if (channel.length) {
                return channel.reduce(function (a, b) {
                        return a + b;
                    }) / channel.length;
            } else return channel;
        })];
        return {
            spectrums: spectrums,
            labels: labels
        }
    }
    
}




