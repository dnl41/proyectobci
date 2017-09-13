import { Injectable } from '@angular/core';

@Injectable()
export class Constants {
  socket: any = {
      url: 'http://localhost:8080',
      events: {
          fft: 'bci:fft',
          time: 'bci:time',
          filter: 'bci:filter',
      }
  };
  filters: Array<any> = [
    { 
      id: 'NOTCH', 
      label: 'Filtro Notch',
      type: 'single',
      enabled: true,
      options: [
        {
          id: 'NOTCH:60',
          label: '60 Hz'
        },
        {
          id: 'NOTCH:50',
          label: '50 Hz'
        },
        {
          id: 'NOTCH:NONE',
          label: 'Ninguno'
        }
        
      ] 
    },
    { 
      id: 'BANDPASS', 
      label: 'Filtro Pasa Banda',
      type: 'single',
      enabled: true,
      options: [
         
        {
          id: 'BANDPASS:1-50',
          label: '1-50 Hz'
        },
        {
          id: 'BANDPASS:7-13',
          label: '7-13 Hz'
        },
        {
          id: 'BANDPASS:15-50',
          label: '15-50 Hz'
        },
        {
          id: 'BANDPASS:5-50',
          label: '5-50 Hz'
        },
        {
          id: 'BANDPASS:NONE',
          label: 'Ninguno'
        }
      ]
    },
    { 
      id: 'VERTSCALE', 
      label: 'Tiempo de escritura de datos',
      type: 'single',
      enabled: true,
      options: [
        {
          id: 'tiempo:14s',
          label: '14s'
        },    
        {
          id: 'tiempo:5m',
          label: '5m'
        },
        {
          id: 'tiempo:15m',
          label: '15m'
        },
        {
          id: 'tiempo:30m',
          label: '30m'
        },
        {
          id: 'tiempo:1h',
          label: '1h'
        },
        {
          id: 'tiempo:4h',
          label: '4h'
        },
        {
          id: 'tiempo:12h',
          label: '12h'
        },
        {
          id: 'tiempo:24h',
          label: '24h'
        }
      ]  
    },
     /*
    { 
      id: 'VERTALGO', 
      label: 'Vert Algo',
      type: 'single',
      enabled: false,
      options: [
      {
          id: 'VERTALGO:Linear',
          label: 'Linear'
        } ,
        {
          id: 'VERTALGO:50',
          label: 'Log'
        }
      ]
    },
   
    { 
      id: 'POLARITY', 
      label: 'Polarity',
      type: 'single',
      enabled: false,
      options: [
        {
          id: 'POLARITY:Yes',
          label: 'Yes'
        },
        {
          id: 'POLARITY:NO',
          label: 'No'
        }
      ] 
    }
    */
  ];

}