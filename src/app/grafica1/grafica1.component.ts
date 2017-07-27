
import * as io from 'socket.io-client';
import { Component, ElementRef } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { SmoothieChart, TimeSeries } from 'smoothie';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrls: ['./grafica1.component.css']
})


export class Grafica1Component implements OnInit {
 socket: any;
  constructor(private view: ElementRef) { 
      this.socket = io('http://localhost:8080');
     }

      public lineChartData:Array<any> = [
    {data: new Array(32), label: 'NORMAL'},
    {data: new Array(32), label: 'FILTRO'},
    {data: new Array(32), label: 'FILTRO2'}
  ];
  public lineChartLabels:Array<any> = new Array(32);
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

 

 ngOnInit() {
        
    this.socket.on('bci:time', (data) => {
      console.log(data);

       let _lineChartData:Array<any> = new Array(this.lineChartData.length);
       for (let i = 0; i < this.lineChartData.length; i++) {
          _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
          }
          for (let j = 0; j < this.lineChartData[0].data.length; j++) {
          _lineChartData[0].data[j] = data.data[0][j]
          }
          for (let j = 0; j < this.lineChartData[1].data.length; j++) {
          _lineChartData[1].data[j] = data.data[1][j]
          }

       
     this.lineChartData = _lineChartData;

    });
  }
  
  ngOnDestroy () {
    this.socket.removeListener('bci:time');

  } 
    
   
 

 
  
 


  

}
