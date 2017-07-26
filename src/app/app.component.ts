import { Component, ElementRef } from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import * as io from 'socket.io-client';
import { Constants } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  {
  socket: any;
  enable1: boolean = true;
  enable2: boolean = true;
  enable3: boolean = true;
  enable4: boolean = true;
  enable5: boolean = true;
  enable6: boolean = true;
  enable7: boolean = true;
  enable8: boolean = true;

   constructor(private view: ElementRef,
                private constants: Constants ){
     this.socket = io(constants.socket.url);
   }

  title = 'SISTEMA BCI';
  
  onChangech1() {this.socket.emit('channel','1:'+ !this.enable1);}
  onChangech2() {this.socket.emit('channel','2:'+ !this.enable2);}
  onChangech3() {this.socket.emit('channel','3:'+ !this.enable3);}
  onChangech4() {this.socket.emit('channel','4:'+ !this.enable4);}
  onChangech5() {this.socket.emit('channel','5:'+ !this.enable5);}
  onChangech6() {this.socket.emit('channel','6:'+ !this.enable6);}
  onChangech7() {this.socket.emit('channel','7:'+ !this.enable7);}
  onChangech8() {this.socket.emit('channel','8:'+ !this.enable8);}
}






