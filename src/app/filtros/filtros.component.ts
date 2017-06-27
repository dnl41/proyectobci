import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { Constantes } from '../Constantes/constantes';


@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css']
})
export class FiltrosComponent {

  socket: any;

  constructor(private constantes: Constantes) { 
     this.socket = io('http://0.0.0.0:8080');
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


