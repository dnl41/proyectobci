'use strict';

const FFT = require('./fft.module');
const TimeSeries = require('./time-series.module');
const Signal = require('./signal.emitter');
const NET = require('./nodemcu');

module.exports = {
    FFT,
    TimeSeries,
    Signal,
    NET
   
}