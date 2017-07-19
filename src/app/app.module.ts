import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Constantes } from './Constantes/constantes';
import { ChartService} from './shared';


import { AppComponent } from './app.component';
import { Grafica1Component } from './grafica1/grafica1.component';

import { ChartsModule} from 'ng2-charts';
import { SignalComponent } from './signal/signal.component';
import { FiltrosComponent } from './filtros/filtros.component';
import { RouterModule, Routes } from '@angular/router';
import { BandasFrecuenciaComponent } from './bandas-frecuencia/bandas-frecuencia.component';
import { GraficaFrecuenciaComponent } from './grafica-frecuencia/grafica-frecuencia.component';
import { GraficaTiempoComponent } from './grafica-tiempo/grafica-tiempo.component';
import { BandaFrecuenciaComponent } from './banda-frecuencia/banda-frecuencia.component';
import { BaseChartDirective} from 'ng2-charts';
import { CHART_DIRECTIVES} from './ng2/ng2.component';
import { UiSwitchModule } from 'angular2-ui-switch';


const routes: Routes = [
  { path: '', component: GraficaTiempoComponent},
  { path: 'Tiempo2', component: SignalComponent},
  { path: 'Frecuencia', component: GraficaFrecuenciaComponent},
  { path: 'Bandas', component: SignalComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    Grafica1Component,
    SignalComponent,
    FiltrosComponent,
    BandasFrecuenciaComponent,
    BandasFrecuenciaComponent,
    GraficaFrecuenciaComponent,
    GraficaTiempoComponent,
    GraficaTiempoComponent,
    BandaFrecuenciaComponent,
    BandaFrecuenciaComponent,
    CHART_DIRECTIVES
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule,
    UiSwitchModule,
    RouterModule.forRoot(routes)


  ],
  providers: [Constantes, ChartService],
  bootstrap: [AppComponent],

})
export class AppModule { }
