import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import * as io from 'socket.io-client';
import { ChartService} from '../modules';

@Component({
  selector: 'app-banda-frecuencia',
  templateUrl: './banda-frecuencia.component.html',
  styleUrls: ['./banda-frecuencia.component.css']
})
export class BandaFrecuenciaComponent implements OnInit, OnDestroy {

 
  socket: any;

  constructor(private chartService: ChartService) {
    this.socket = io('http://localhost:8080');
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
