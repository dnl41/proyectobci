import { Component } from '@angular/core';

//import { Grafica1Component } from './grafica1/grafica1.component';
import { Routes, Router} from '@angular/router';
import * as io from 'socket.io-client';

export class Hero {
  id: number;
  name: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
    socket: any = io('http://localhost:8080');

  clicked(event) {
    this.socket.emit('openbci',"inicio");  
  }
  clicked2(event) {
    this.socket.emit('openbci',"detener");  
    console.log("detener")
  }
  title = 'PROYECTO BCI';
  selectedHero: Hero;
}





