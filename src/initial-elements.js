import React from 'react';

export default [
  {
    id: '1',
    type: 'input',
    data: {
      label: (
        <>
          Point1
        </>
      ),
    },
    position: { x: 250, y: 0 },
    style: {
        background: 'rgba(0,0, 0,0)',
        color: '#9EA3B0',
        border: '1px solid rgba(0,0,0,0)',
        width: 50,
        
      },
  },
  {
    id: '2',
    type: 'input',
    data: {
      label: (
        <>
          Point2
        </>
      ),
    },
    position: { x: 100, y: 100 },
  },
  { id: 'e1-2', source: '1', target: '2',type :'straight'},
];