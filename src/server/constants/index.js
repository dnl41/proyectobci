'use strict';

module.exports = {
    connector: {
        channels: 8,
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
        global: 1,
        simulated: 4,
        //skipLabels: 4
    },

    units: {
        hertz: 'Hz',
        microvolts: 'uV',
        seconds: 's'
    },
    bands: { // frequency
        delta: [1, 3],
        theta: [4, 8],
        alpha: [8, 12],
        beta: [13, 30],
        gamma: [30, 100]
    },
    time: {
        windowSize: 5, // seconds
        timeline: 20, // seconds
        skip: 2 // 
    },
    events: {
        fft: 'bci:fft',
        time: 'bci:time',
        signal: 'bci:signal',
        filter: 'bci:filter',
       // terminate: 'SIGINT'
    },
    sockets: {
        port: 8080
    }
};