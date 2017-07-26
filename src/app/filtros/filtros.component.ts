import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { Constants } from '../constants';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css']
})
export class FiltrosComponent {
  socket: any;
  constructor(private constantes: Constants) { 
     this.socket = io('http://localhost:8080');
  }
 private filters: Array<any> = this.constantes.filters;
  
  applyFilter (filter) {
    this.socket.emit('bci:filter',filter);
  } 

  clicked(event) {
    this.socket.emit('openbci',"inicio");  
  }
  clicked2(event) {
    this.socket.emit('openbci',"detener");  
    console.log("detener")
  }




}


