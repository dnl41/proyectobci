'use strict';

module.exports = {
    signal: {
        bufferSize: 256,
        sampleRate: 250,
        windowSize: 32, // data has a moving window of 32 samples = 128 milliseconds (250Hz)
        offset: 2
    },
    stateCh: {
       1:true,
       2:true,
       3:true,
       4:true,
       5:true,
       6:true,
       7:true,
       8:true
    }, 
    Mcu:{
        send: false
    },
    print: { // print in consola
        flag: false
    },
    fft: {
        bins: 256
    },
    scale: {
        global: 5,
        simulated: 3,
        skipLabels: 4 // fft labels
    },
    units: {
        volts: 'uV',
    },
    bands: { // frequency bands
        delta: [1, 3],
        theta: [4, 8],
        alpha: [8, 12],
        beta: [13, 30],
        gamma: [30, 100]
    },
    time: {  // labels of timeseries
        windowSize: 5, // seconds
        timeline: 20, // seconds
        skip: 1 
    },
    sockets: {
        port: 8080
    }
};