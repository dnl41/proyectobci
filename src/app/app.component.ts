import { Component } from '@angular/core';

//import { Grafica1Component } from './grafica1/grafica1.component';
import { Routes, Router} from '@angular/router';
import * as io from 'socket.io-client';

export class Hero {
  id: number;
  name: string;
}


const HEROES: Hero[] = [
  { id: 11, name: 'Mr. Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];

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
  heroes = HEROES;
  selectedHero: Hero;
 
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}





