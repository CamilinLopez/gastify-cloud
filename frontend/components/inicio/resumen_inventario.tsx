import { Inventario } from '@/types/resumen_inventario';
import React from 'react';

const mockData: Inventario[] = [
  { tipo: '5 kg', llenos: 80, vacios: 20 },
  { tipo: '11 kg', llenos: 60, vacios: 40 },
  { tipo: '15 kg', llenos: 20, vacios: 10 },
  { tipo: '45 kg', llenos: 50, vacios: 50 },
  { tipo: 'H15', llenos: 70, vacios: 30 },
];

export default function ResumenInventario() {
  return (
    <div className="p-4 w-full">
      <h3 className="text-18px py-4   ">Resumen de Inventario</h3>
      <div className="flex w-full">
        <div className='w-1/2' >
          <h4 className="text-16px">Cantidad de cilindros llenos por tipo</h4>
          <p className="text-32px">100%</p>
          {mockData.map((item) => (
            <div key={item.tipo} className="p-2">
              <span className="text-13px">{item.tipo}</span>
              <div>
                <div className="pt-3 bg-gris-1 border-r-gris-2 border-2" style={{ width: `${item.llenos}%` }}></div>
              </div>
            </div>
          ))}
        </div>
        <div className='w-1/2' >
          <h4 className="text-16px">Cantidad de cilindros vacíos por tipo</h4>
          <p className="text-32px p-1">100%</p>
          {mockData.map((item) => (
            <div key={item.tipo} style={{ margin: '5px 0' }}>
              <span className="text-13px p-1">{item.tipo}</span>
              <div className=" rounded overflow-hidden">
                <div className="pt-3 bg-gris-1 border-r-gris-2 border-2" style={{ width: `${item.vacios}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
