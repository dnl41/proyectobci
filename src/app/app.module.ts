import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Constantes } from './Constantes/constantes';

import { AppComponent } from './app.component';
import { Grafica1Component } from './grafica1/grafica1.component';

import { ChartsModule } from 'ng2-charts';
import { CHART_DIRECTIVES } from './shared/ng2-charts';
import { SignalComponent } from './signal/signal.component';
import { FiltrosComponent } from './filtros/filtros.component';
import { RouterModule, Routes } from '@angular/router';
import { BandasComponent } from './bandas/bandas.component';
import { BandaComponent } from './banda/banda.component';

const routes: Routes = [
  { path: 'Tiempo', component: Grafica1Component},
  { path: 'Tiempo2', component: SignalComponent},
  { path: 'Frecuencia', component: SignalComponent},
  { path: 'Bandas', component: BandasComponent},

];

@NgModule({
  declarations: [
    AppComponent,
    Grafica1Component,
    SignalComponent,
    FiltrosComponent,
    BandasComponent,
    BandaComponent,
    BandaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [Constantes],
  bootstrap: [AppComponent]
})
export class AppModule { }
