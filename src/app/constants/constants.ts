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
      label: 'Vert Scale',
      type: 'single',
      enabled: false,
      options: [
        {
          id: 'VERTSCALE:NONE',
          label: 'Ninguno'
        },    
        {
          id: 'VERTSCALE:50',
          label: '50uV'
        },
        {
          id: 'VERTSCALE:100',
          label: '100uV'
        },
        {
          id: 'VERTSCALE:200',
          label: '200uV'
        },
        {
          id: 'VERTSCALE:400',
          label: '400uV'
        },
        {
          id: 'VERTSCALE:1000',
          label: '1000uV'
        },
        {
          id: 'VERTSCALE:10000',
          label: '10,000uV'
        }
      ]  
    },
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
    /*
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