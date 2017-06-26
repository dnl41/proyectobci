import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import * as io from 'socket.io-client';
import { ChartService } from '../shared/chart.service';

@Component({
  selector: 'app-banda',
  templateUrl: './banda.component.html',
  styleUrls: ['./banda.component.css']
})
export class BandaComponent implements OnInit {
   socket: any;
  constructor(private chartService: ChartService) {
  this.socket = io('http://localhost:8080'); }
  @Input() public type:string;
  @Input() public band:string;
  @Input() public color:number;
  
  private data:Array<any> = [{ data: [], label: [] }];
  private colors = this.chartService.getColorByIndex(this.color);
  private channels = this.chartService.getChannels();
  private options = this.chartService.getChartJSBarDefaults();
  
  ngOnInit() {
    this.colors = this.chartService.getColorByIndex(this.color);
    this.socket.on('bci:fft', (data) => {
      this.data = [];
      data[this.band || 'data'].forEach((dataset, index) => {
        this.data.push({
          data: dataset
        });
      });
    });
  }
  
  ngOnDestroy () {
    this.socket.removeListener('bci:fft');
  } 
}
