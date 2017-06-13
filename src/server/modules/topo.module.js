'use strict';

const topogrid = require('topogrid');
const Utils = require('../utils');
//const constants = require('../constants');

module.exports = class Topo {
    
    constructor ({ Signal }) {
        this.signal = Signal;
        this.sampleRate = 256;
        this.grid = [];
        this.subscribe();
    }
    
    subscribe () {
        this.signal.emitter.on('bci:signal', (signal) => {     
            this.signalToGrid(signal);
            this.emit();
        });
    }
    
    signalToGrid (signal) {
        
        let grid = [];
        
        signal.forEach((channel) => {
            grid.push(channel[channel.length - 1]);
        });
        
        /**
         * params: Parameters for the grid [x,y,z] where x is the min
         * of the grid, y is the Max of the grid and z is the number of points
         * x: coordinates of the data
         * y: coordinates of the data
         * grid: data = [10,0,0,0,0,0,-10,30,25]; // the data values
         */
        this.grid = topogrid.create(
            constants.topo.x, 
            constants.topo.y, 
            grid, 
            constants.topo.params
        );
    }
    
    emit () {
        this.signal.io.emit('bci:topo', {
            data: this.grid
        });   
    }
    
}
