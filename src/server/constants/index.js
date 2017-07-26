'use strict';

module.exports = {
    connector: {
       // channels: 8,
          //simulateFlag: 'simulate',
        //readyEvent: 'ready',
        //sampleEvent: 'sample'
    },
    signal: {
        bufferSize: 256,
        sampleRate: 250,
        windowSize: 32 // data has a moving window of 32 samples = 128 milliseconds (250Hz)
    },

    fft: {
        bins: 256
    },

    scale: {
        global: 3,
        simulated: 3,
        skipLabels: 4 // fft labels
    },

    units: {
       // hertz: 'Hz',
        volts: 'uV',
        seconds: 's'
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
    //events: {
        //fft: 'bci:fft',
        //time: 'bci:time',
        //signal: 'bci:signal',
        //filter: 'bci:filter',
       // terminate: 'SIGINT'
    //},
    sockets: {
        port: 8080
    }
};