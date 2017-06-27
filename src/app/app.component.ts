import { Component } from '@angular/core';
import { Routes, Router} from '@angular/router';

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
  title = 'SISTEMA BCI';
  selectedHero: Hero;
}





