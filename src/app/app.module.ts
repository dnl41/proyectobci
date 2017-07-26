import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartsModule} from 'ng2-charts';
import { UiSwitchModule } from '../../node_modules/angular2-ui-switch/src';
import { RouterModule, Routes } from '@angular/router';

import { Constants } from './constants';
import { ChartService, CHART_DIRECTIVES} from './modules';
//Components
import { AppComponent } from './app.component';
import { FiltrosComponent } from './filtros/filtros.component';
import { BandaFrecuenciaComponent } from './banda-frecuencia/banda-frecuencia.component';
import { BandasFrecuenciaComponent } from './bandas-frecuencia/bandas-frecuencia.component';
import { GraficaFrecuenciaComponent } from './grafica-frecuencia/grafica-frecuencia.component';
import { GraficaTiempoComponent } from './grafica-tiempo/grafica-tiempo.component';
// component test
import { Grafica1Component } from './grafica1/grafica1.component';
import { SignalComponent } from './signal/signal.component';


const routes: Routes = [
  { path: '', component: GraficaTiempoComponent},
  { path: 'Frecuencia', component: GraficaFrecuenciaComponent},
  { path: 'Bandas', component: BandasFrecuenciaComponent},
  { path: '1', component: SignalComponent},
  { path: '2', component: Grafica1Component}
];

@NgModule({
  declarations: [
    AppComponent,
    FiltrosComponent,
    BandaFrecuenciaComponent,
    BandasFrecuenciaComponent,
    GraficaFrecuenciaComponent,
    GraficaTiempoComponent,
    CHART_DIRECTIVES,

    Grafica1Component,
    SignalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule,
    UiSwitchModule,
    RouterModule.forRoot(routes)
  ],
  providers: [Constants, ChartService],
  bootstrap: [AppComponent],

})
export class AppModule { }
