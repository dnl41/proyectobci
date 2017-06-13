import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { SmoothieChart, TimeSeries } from 'smoothie';
//import { ChartService, Constants } from '../shared';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrls: ['./grafica1.component.css']
})
export class Grafica1Component implements OnInit {
 
  socket: any;

  constructor() { 
  this.socket = io('http://localhost:8080')

  }

 // private options = this.chartService.getChartSmoothieDefaults();
  //private channels = this.chartService.getChannels();
  //private colors = this.chartService.getColors();

  //private timeSeries = new SmoothieChart(this.options);
  private amplitudes = [];
  private timeline = [];
  private lines = Array(8).fill(0).map(() => new TimeSeries());
  //private dato1;

 public lineChartData:Array<any> = [
    {data: new Array(600), label: 'Series A'}
  ];


  public lineChartLabels:Array<any> =  new Array(600);
    public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0)',
      borderColor: 'rgba(59, 197, 224,6)',
      pointBackgroundColor: 'rgba(148,159,177,0)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
  ];
   
  public lineChartLegend:boolean = false;
  public lineChartType:string = 'line';

   dato1: string = "";

  ngOnInit() {
    console.log(this.lineChartData[0].data.length);
    
  	this.socket.on('bci:time', (signal) => {
      
      this.dato1 = signal.channelData[0];
      let _lineChartData:Array<any> = new Array(this.lineChartData.length);

      for (let i = 0; i < this.lineChartData.length; i++) {
         _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
         for (let j = this.lineChartData[0].data.length - 1; j > 0; j--) {
           _lineChartData[i].data[j-1]=this.lineChartData[i].data[j];
      }
      _lineChartData[i].data[600] = signal.channelData[0];
    }
    this.lineChartData = _lineChartData;
    });
    
   
  }

  public randomize():void {

 
    

  }
  
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }


  

}
