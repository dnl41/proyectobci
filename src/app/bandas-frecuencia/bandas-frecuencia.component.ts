import { Component, OnInit,Input } from '@angular/core';
import * as io from 'socket.io-client';
import { Constantes } from '../constantes/constantes';
import { ChartService } from '../constantes/chart.service';
import { CHART_DIRECTIVES } from '../base-chart/base-chart.component';

@Component({
  selector: 'app-bandas-frecuencia',
  templateUrl: './bandas-frecuencia.component.html',
  styleUrls: ['./bandas-frecuencia.component.css']
})
export class BandasFrecuenciaComponent implements OnInit{

    socket: any;
  constructor() { 
  this.socket = io('http://localhost:8080')
  }


   public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'}
  ];
 
  private data:Array<any> = [{ data: [], label: [] }];
   @Input() public band:string;

  ngOnInit() {    
    this.socket.on('bci:fft', (signal) => {
     console.log(signal);

     /*
      
      let _lineChartData:Array<any> = new Array(this.lineChartData.length);

      for (let i = 0; i < this.lineChartData.length; i++) {
         _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
         for (let j = this.lineChartData[0].data.length - 1; j > 0; j--) {
           _lineChartData[i].data[j-1]=this.lineChartData[i].data[j];
      }
      _lineChartData[i].data[this.tamaño] = signal.amplitudes[0];
    }
    this.lineChartData = _lineChartData;

    ;*/
    this.data = [];
       this.data[this.band || 'data'].forEach((dataset, index) => {
        this.data.push({
          data: dataset
        });
      });
    })

  } 

  }
  


