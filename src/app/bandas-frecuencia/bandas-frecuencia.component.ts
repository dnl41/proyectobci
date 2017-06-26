import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import * as io from 'socket.io-client';
import { Constantes } from '../constantes/constantes';
import { ChartService } from '../constantes/chart.service';
import { CHART_DIRECTIVES } from '../base-chart/base-chart.component';

@Component({
  selector: 'app-bandas-frecuencia',
  templateUrl: './bandas-frecuencia.component.html',
  styleUrls: ['./bandas-frecuencia.component.css']
})
export class BandasFrecuenciaComponent implements OnInit {
   socket: any;
  constructor(private chartService: ChartService, 
              private constants: Constantes) { 
    this.socket = io(constants.socket.url);
  }

  @Input() public type:string;
  @Input() public band:string;
  @Input() public color:number;
  
  private data:Array<any> = [{ data: [], label: [] }];
  private colors = this.chartService.getColorByIndex(this.color);
  private channels = this.chartService.getChannels();
  private options = this.chartService.getChartJSBarDefaults();
  
  ngOnInit() {
    this.colors = this.chartService.getColorByIndex(this.color);
    this.socket.on(this.constants.socket.events.fft, (data) => {
      this.data = [];
      data[this.band || 'data'].forEach((dataset, index) => {
        this.data.push({
          data: dataset
        });
      });
    });
  }
  
  ngOnDestroy () {
    this.socket.removeListener(
      this.constants.socket.events.fft
    );
  } 
}
