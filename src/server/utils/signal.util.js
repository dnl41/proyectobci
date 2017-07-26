'use strict';

var argv = require('yargs').argv;
const constants = require('../constants');
var flag2 = true;

module.exports = {
    
    voltsToMicrovolts (volts, log) {
        if (!Array.isArray(volts)) {
            volts = [volts];
        }
        return volts.map((volt) => {
            return log ? Math.log10(Math.pow(10, 6) * volt) : Math.pow(10, 6) * volt;
        });
    },
    
    offsetForGrid (amplitude, channelNumber, channelAmount = 8, scale = 1) {
        let scaledAmplitude = amplitude * Math.pow(20, scale);
        let offset = constants.signal.offset * (channelAmount - channelNumber) - 1;
        return parseFloat(scaledAmplitude + offset);
    },
    
    isSimulated () {
        return !!(argv._[0] && argv._[0] === 'simulated');
    }

    
}