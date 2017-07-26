import { Component, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';
import * as io from 'socket.io-client';
import { ChartService} from '../modules';
import { Constants } from '../constants/constants';
//import { BaseChartDirective} from 'ng2-charts';


@Component({
  selector: 'app-grafica-frecuencia',
  templateUrl: './grafica-frecuencia.component.html',
  styleUrls: ['./grafica-frecuencia.component.css'],
})
export class GraficaFrecuenciaComponent implements OnInit {
  
socket: any;
  
  constructor(private chartService: ChartService) {
    this.socket = io('http://localhost:8080');
    this.type = 'line';
    this.options = this.chartService.getChartJSLineDefaults();
    
  }
  
  @Input() type:string;
  
  private data:Array<any> = Array(8).fill(0).map(() => { return { data: [], label: [] } });
  private labels:Array<any> = [];
  private colors:Array<any> = this.chartService.getColors();
  private channels:Array<string> = this.chartService.getChannels();
  private options:any;
  
  ngOnInit() {    
    this.socket.on('bci:fft', (data) => {
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
    this.socket.removeListener('bci:fft'
    );
  } 
}

