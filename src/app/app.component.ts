import { Component } from '@angular/core';

//import { Grafica1Component } from './grafica1/grafica1.component';
import { Routes, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

//@Routes([
  //{ path: '/', component: Grafica1Component },
  //{ path: '/time-series', component: TimeSeriesComponent },
  //{ path: '/frequency/line', component: FrequencyComponent },
  //{ path: '/frequency/radar', component: FrequencyComponent },
  //{ path: '/frequency/bands', component: FrequencyBandsComponent },
  //{ path: '/motion', component: MotionComponent },
  //{ path: '/topo', component: TopoComponent }
//])

export class AppComponent {
  title = 'app works!';
}

