import { Driver } from '@/types/rendimiento_conductores';
import React from 'react';

const Tabla = () => {
  const drivers: Driver[] = [
    { id: '001', name: 'Juan Perez', deliveries: 100, returns: 10 },
    { id: '002', name: 'Maria Gonzalez', deliveries: 90, returns: 5 },
    { id: '003', name: 'Carlos Lopez', deliveries: 80, returns: 8 },
    { id: '004', name: 'Luis Hernandez', deliveries: 70, returns: 7 },
    { id: '005', name: 'Ana Ramirez', deliveries: 60, returns: 6 },
  ];

  return (
    <div className="overflow-x-auto border-[1px] rounded-xl">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-blanco">
          <tr>
            <th className="px-6 py-3 text-left text-xs text-14px">ID Conductor</th>
            <th className="px-6 py-3 text-left text-xs text-14px">Nombre</th>
            <th className="px-6 py-3 text-left text-xs text-14px">Entregas</th>
            <th className="px-6 py-3 text-left text-xs text-14px">Devoluciones </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {drivers.map((row, index) => (
            <tr key={index}>
              <td className="px-6 py-4 text-14px">{row.id}</td>
              <td className="px-6 py-4 text-14px">{row.name}</td>
              <td className="px-6 py-4 text-secondary-14px">{row.deliveries}</td>
              <td className="px-6 py-4 text-secondary-14px">{row.returns}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function Rendimiento_conductores() {
  return (
    <div className="bg-blanco px-4 py-6 w-full">
      <div>
        <h1 className="text-18px" id="rendimiento_conductores">
          Rendimiento de conductores
        </h1>
      </div>
      <div className="py-5">
        <Tabla />
      </div>
    </div>
  );
}
