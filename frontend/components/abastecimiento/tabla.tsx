import { TablaAbastecimiento } from '@/types/abastecimieneto';
import React from 'react';

export default function Tabla() {
  const textTable = ['Tipo de cilindro', 'Stock actual', 'Stock mínimo', 'Alerta'];
  const info: TablaAbastecimiento[] = [
    {
      'Tipo de cilindro': '5kg',
      'Stock actual': 36,
      'Stock mínimo': 20,
      Alerta: 'Bajo Stock',
    },
    {
      'Tipo de cilindro': '11kg',
      'Stock actual': 36,
      'Stock mínimo': 20,
      Alerta: 'Bajo Stock',
    },
    {
      'Tipo de cilindro': '15kg',
      'Stock actual': 36,
      'Stock mínimo': 20,
      Alerta: 'Bajo Stock',
    },
    {
      'Tipo de cilindro': '20kg',
      'Stock actual': 36,
      'Stock mínimo': 20,
      Alerta: 'Bajo Stock',
    },
    {
      'Tipo de cilindro': 'H15',
      'Stock actual': 36,
      'Stock mínimo': 20,
      Alerta: 'Bajo Stock',
    },
  ];
  return (
    <div className="p-4 w-full">
      <h1 className="text-18px py-6" id='alertas_stock'>Alertas de stock</h1>
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
                <td className="px-6 py-4 font-Inter font-[400] text-[#121417] text-[14px]">
                  {item['Tipo de cilindro']}
                </td>
                <td className="px-6 py-4 text-secondary-14px ">{item['Stock actual']}</td>
                <td className="px-6 py-4 text-secondary-14px ">{item['Stock mínimo']}</td>
                <td className="px-6 py-4 text-secondary-14px ">{item['Alerta']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
