import React from 'react';

interface Inventario {
  tipo: string;
  llenos: number;
  vacios: number;
}

interface Inventario {
  tipo: string;
  llenos: number;
  vacios: number;
}

const mockData: Inventario[] = [
  { tipo: '5 kg', llenos: 80, vacios: 20 },
  { tipo: '11 kg', llenos: 60, vacios: 40 },
  { tipo: '15 kg', llenos: 90, vacios: 10 },
  { tipo: '45 kg', llenos: 50, vacios: 50 },
  { tipo: 'H15', llenos: 70, vacios: 30 },
];


export default function ResumenInventario() {
  return (
    <div className="p-4">
      <h3 className="text-18px py-4   ">Resumen de Inventario</h3>
      <div className="flex gap-x-80">
        <div>
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
        <div>
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
