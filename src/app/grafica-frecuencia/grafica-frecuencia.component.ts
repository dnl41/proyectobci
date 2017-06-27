import { Component, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';
import * as io from 'socket.io-client';
import { ChartService, Constants } from '../shared';


@Component({
  selector: 'app-grafica-frecuencia',
  templateUrl: './grafica-frecuencia.component.html',
  styleUrls: ['./grafica-frecuencia.component.css']
})
export class GraficaFrecuenciaComponent implements OnInit, OnDestroy {
  
 socket: any;
  
  constructor(private chartService: ChartService,
              private constants: Constants) {
    this.socket = io(constants.socket.url);
    this.options = this.chartService.getChartJSLineDefaults();

  }

  private data:Array<any> = Array(8).fill(0).map(() => { return { data: [], label: [] } });
  private labels:Array<any> = [];
  private colors:Array<any> = this.chartService.getColors();
  private channels:Array<string> = this.chartService.getChannels();
  private options:any;

  ngOnInit() {    
    this.socket.on(this.constants.socket.events.fft, (data) => {
      this.data = [];
      data.data.forEach((dataset, index) => {
        this.data.push({
          data: dataset,
          label: this.channels[index],
          borderWidth: 1,
          pointRadius: 0,
          fill: false
        });
      });
      this.labels = data.labels;
    });
  }
  
  ngOnDestroy () {
    this.socket.removeListener(
      this.constants.socket.events.fft
    );
  } 
  


}
