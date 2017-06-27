import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Constantes } from './Constantes/constantes';
import { ChartService} from './shared';

import { AppComponent } from './app.component';
import { Grafica1Component } from './grafica1/grafica1.component';

import { ChartsModule } from 'ng2-charts';
import { SignalComponent } from './signal/signal.component';
import { FiltrosComponent } from './filtros/filtros.component';
import { RouterModule, Routes } from '@angular/router';
import { BaseChartComponent } from './base-chart/base-chart.component';
import { BandasFrecuenciaComponent } from './bandas-frecuencia/bandas-frecuencia.component';
import { GraficaFrecuenciaComponent } from './grafica-frecuencia/grafica-frecuencia.component';



const routes: Routes = [
  { path: '', component: Grafica1Component},
  { path: 'Tiempo2', component: SignalComponent},
  { path: 'Frecuencia', component: GraficaFrecuenciaComponent},
  { path: 'Bandas', component: BandasFrecuenciaComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    Grafica1Component,
    SignalComponent,
    FiltrosComponent,
    BaseChartComponent,
    BandasFrecuenciaComponent,
    BandasFrecuenciaComponent,
    GraficaFrecuenciaComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [Constantes, ChartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
