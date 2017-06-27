import { Component, ElementRef } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { SmoothieChart, TimeSeries } from 'smoothie';
import { ChartService, Constants } from '../shared';
import * as io from 'socket.io-client';


@Component({
  selector: 'app-grafica-tiempo',
  templateUrl: './grafica-tiempo.component.html',
  styleUrls: ['./grafica-tiempo.component.css']
})
export class GraficaTiempoComponent implements OnInit, OnDestroy {
 socket: any;
  constructor(private view: ElementRef,
  	          private chartService: ChartService) { 
      this.socket = io('http://localhost:8080');
     this.chartService = chartService;}

  private options = this.chartService.getChartSmoothieDefaults();
  private channels = this.chartService.getChannels();
  private colors = this.chartService.getColors();
  private timeSeries = new SmoothieChart(this.options);
  private amplitudes = [];
  private timeline = [];
  private lines = Array(8).fill(0).map(() => new TimeSeries());

 ngOnInit() {
    this.addTimeSeriesLines();
        
    this.socket.on('bci:time', (data) => {
      this.amplitudes = data.amplitudes;
      this.timeline = data.timeline;
      this.appendTimeSeriesLines(data.data);
    });
  }
  
  ngOnDestroy () {
    this.socket.removeListener('bci:time');
  } 
  
  ngAfterViewInit () {
    this.timeSeries.streamTo(
      this.view.nativeElement.querySelector('#timeSeries')
    );
  }
  
  addTimeSeriesLines () {
    this.lines.forEach((line, index) => {
        this.timeSeries.addTimeSeries(line, { 
          strokeStyle: this.colors[index].borderColor 
        });
    });
  }
  
  appendTimeSeriesLines (data) {
    this.lines.forEach((line, index) => {
          data[index].forEach((amplitude) => {
              line.append(new Date().getTime(), amplitude);
          });
      });
  }


}
