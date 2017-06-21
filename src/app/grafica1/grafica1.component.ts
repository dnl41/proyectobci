import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrls: ['./grafica1.component.css']
})


export class Grafica1Component implements OnInit {



  socket: any;
  dato1: string = "";
  tamaño: number = 500;

  constructor() { 
  this.socket = io('http://localhost:8080')

  }

 

  private amplitudes = [];
  private timeline = [];

  public lineChartData:Array<any> = [
    {data: new Array(this.tamaño)}
  ];
  public lineChartData2:Array<any> = [
    {data: new Array(this.tamaño)}
  ];

  public lineChartLabels:Array<any> =  new Array(this.tamaño);
    public lineChartOptions:any = {
    responsive: true


  };
  
  public lineChartColors:Array<any> = [
    { // 
     backgroundColor: 'rgba(153,153,153,0)',
     borderColor: 'rgba(0, 128, 255,7)',
     pointBackgroundColor: 'rgba(148,159,177,0)',
     pointBorderColor: '#0080ff',
     pointHoverBackgroundColor: '#0080ff',
     pointHoverBorderColor: 'rgba(0, 128, 255,0)'
    },
  ];
   
  public lineChartLegend:boolean = false;
  public lineChartType:string = 'line';


   

  ngOnInit() {
    console.log(this.lineChartData[0].data.length);
    this.socket.on('bci:pura', (signal) => {
    this.dato1 = signal.channelData[0];

    });
    
  	this.socket.on('bci:time', (signal) => {
     
      
      let _lineChartData:Array<any> = new Array(this.lineChartData.length);

      for (let i = 0; i < this.lineChartData.length; i++) {
         _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
         for (let j = this.lineChartData[0].data.length - 1; j > 0; j--) {
           _lineChartData[i].data[j-1]=this.lineChartData[i].data[j];
      }
      _lineChartData[i].data[this.tamaño] = signal.amplitudes[0];
    }
    this.lineChartData = _lineChartData;


    });
    
   
  }

 
  
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }


  

}
