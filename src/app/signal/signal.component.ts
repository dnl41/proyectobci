import { Component, OnInit } from '@angular/core';
import {SmoothieChart} from "smoothie";
import {TimeSeries} from "smoothie";
import * as io from 'socket.io-client';


@Component({
  selector: 'app-signal',
  templateUrl: './signal.component.html',
  styleUrls: ['./signal.component.css']
})
export class SignalComponent implements OnInit {

 dato1: string = "";
	chart: any;
	line1: any;
	socket: any;

  constructor() { 
  this.socket = io('http://localhost:8080')
}

  ngOnInit() {
  	this.chart = new SmoothieChart(
  		{millisPerPixel:50,
  			interpolation:'linear',
  			scaleSmoothing:0.01,
  			grid:{fillStyle:'#4f4f4f',
  			strokeStyle:'rgba(119,119,119,0.21)'
  			,sharpLines:true,verticalSections:7},
  		labels:{
  				fillStyle:'#549ef4',
  				fontSize:11,precision:6},minValue:-200,maxValue:200
        });
  	this.chart.streamTo(document.getElementById("mycanvas"));
    this.line1 = new TimeSeries();
 


  	this.socket.on('bci:time', (signal) => {

      this.appendTimeSeriesLines(signal.data);
 

    });


    
 
  }

  appendTimeSeriesLines (data) {
    this.line1.forEach((line, index) => {
          data[index].forEach((amplitude) => {
              line.append(new Date().getTime(), amplitude);
              this.dato1 = amplitude;
          });
      });

    this.chart.addTimeSeries(this.line1, {lineWidth:1.2,strokeStyle:'#50c0ff'});
  }

}
