import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { Grafica1Component } from './grafica1/grafica1.component';

import { ChartsModule } from 'ng2-charts';
import { SignalComponent } from './signal/signal.component';

@NgModule({
  declarations: [
    AppComponent,
    Grafica1Component,
    SignalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }