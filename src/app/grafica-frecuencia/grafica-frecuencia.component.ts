import { Component, ElementRef } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import { SmoothieChart, TimeSeries } from 'smoothie';
import { ChartService, Constants } from '../shared';
import * as io from 'socket.io-client';


@Component({
  selector: 'app-grafica-frecuencia',
  templateUrl: './grafica-frecuencia.component.html',
  styleUrls: ['./grafica-frecuencia.component.css']
})
export class GraficaFrecuenciaComponent implements OnInit {

  constructor(private chartService: ChartService) { }

  ngOnInit() {
  }

}
