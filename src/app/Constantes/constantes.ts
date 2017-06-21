import { Injectable } from '@angular/core';

@Injectable()
export class Constantes {

  socket: any = {
      url: 'http://localhost:8080',
      events: {
          fft: 'bci:fft',
          time: 'bci:time',
          topo: 'bci:topo',
          filter: 'bci:filter',
          motion: 'bci:motion'
      }
  };
  
  filters: Array<any> = [
    { 
      id: 'NOTCH', 
      label: 'Notch',
      type: 'single',
      enabled: true,
      options: [
        {
          id: 'NOTCH:NONE',
          label: 'None'
        },
        {
          id: 'NOTCH:60',
          label: '60 Hz'
        },
        {
          id: 'NOTCH:50',
          label: '50 Hz'
        }
        
      ] 
    },
    { 
      id: 'BANDPASS', 
      label: 'Band Pass',
      type: 'single',
      enabled: true,
      options: [
         {
          id: 'BANDPASS:NONE',
          label: 'None'
        },
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
        }
       
      ]
    },
    { 
      id: 'VERTSCALE', 
      label: 'Vert Scale',
      type: 'single',
      enabled: true,
      options: [
        {
          id: 'VERTSCALE:NONE',
          label: 'None'
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
      enabled: true,
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
      id: 'SMOOTH', 
      label: 'Smooth',
      type: 'single',
      enabled: false,
      options: [
        {
          id: 'SMOOTH:0-75',
          label: '0 75'
        },
        {
          id: 'SMOOTH:0-9',
          label: '0 9'
        },
        {
          id: 'SMOOTH:0-95',
          label: '0 95'
        },
        {
          id: 'SMOOTH:0-98',
          label: '0 98'
        },
        {
          id: 'SMOOTH:0-0',
          label: '0 0'
        },
        {
          id: 'SMOOTH:0-5',
          label: '0 5'
        },
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
    },
    { 
      id: 'MAXFREQUENCY', 
      label: 'Max Frequency',
      type: 'single',
      enabled: false,
      options: [
        {
          id: 'MAXFREQUENCY:60',
          label: '60 Hz'
        },
        {
          id: 'MAXFREQUENCY:120',
          label: '120 Hz'
        },
        {
          id: 'MAXFREQUENCY:20',
          label: '20 Hz'
        },
        {
          id: 'MAXFREQUENCY:40',
          label: '40 Hz'
        }
      ]
    }
  ];

}