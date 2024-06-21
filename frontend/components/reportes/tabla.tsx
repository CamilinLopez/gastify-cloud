import { TablaReportes } from '@/types/reportes';
import React from 'react';

export default function Tabla() {
  const info: TablaReportes[] = [
    {
      Fecha: '2022/03/6',
      'ID Conductor': 'saes1s2d2sf',
      '5kg': 36,
      '11kg': 25,
      '15kg': 15,
      '45kg': 96,
      H15: 26,
      'Total kilos vendidos': 136,
    },
    {
      Fecha: '2022/03/6',
      'ID Conductor': 'saes1s2d2sf',
      '5kg': 36,
      '11kg': 25,
      '15kg': 15,
      '45kg': 96,
      H15: 26,
      'Total kilos vendidos': 136,
    },
    {
      Fecha: '2022/03/6',
      'ID Conductor': 'saes1s2d2sf',
      '5kg': 36,
      '11kg': 25,
      '15kg': 15,
      '45kg': 96,
      H15: 26,
      'Total kilos vendidos': 136,
    },
    {
      Fecha: '2022/03/6',
      'ID Conductor': 'saes1s2d2sf',
      '5kg': 36,
      '11kg': 25,
      '15kg': 15,
      '45kg': 96,
      H15: 26,
      'Total kilos vendidos': 136,
    },
  ];
  const textTable = ['Fecha', 'ID Conductor', '5kg', '11kg', '15kg', '45kg', 'H15', 'Total kilos vendidos'];
  return (
    <div className="p-4 w-full">
      <h1 className="text-18px py-6">Resumen de Reportes Diarios</h1>
      <div className="overflow-x-auto border-[1px] rounded-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blanco">
            <tr>
              {textTable.map((item) => (
                <th key={item} className="px-6 py-3 text-left text-xs text-14px">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {info.map((item, i) => (
              <tr key={i}>
                <td className="px-6 py-4 font-Inter font-[400] text-[#121417] text-[14px]">{item.Fecha}</td>
                <td className="px-6 py-4 text-secondary-14px ">{item['ID Conductor']}</td>
                <td className="px-6 py-4 text-secondary-14px ">{item['5kg']}</td>
                <td className="px-6 py-4 text-secondary-14px ">{item['11kg']}</td>
                <td className="px-6 py-4 text-secondary-14px ">{item['15kg']}</td>
                <td className="px-6 py-4 text-secondary-14px ">{item['45kg']}</td>
                <td className="px-6 py-4 text-secondary-14px ">{item.H15}</td>
                <td className="px-6 py-4 text-secondary-14px ">{item['Total kilos vendidos']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
