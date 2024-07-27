'use client';

import { RootState } from '@/redux/reducer';
import { getTablaStock } from '@/redux/slice/abastecimiento/thunks';
import { AppDispatch } from '@/redux/store';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Tabla() {
  const dispatch: AppDispatch = useDispatch();
  const data = useSelector((state: RootState) => state.abastecimiento.tablaResponse);
  const textTable = ['Tipo de cilindro', 'Stock actual', 'Stock mínimo', 'Alerta'];

  useEffect(() => {
    dispatch(getTablaStock());
  }, [dispatch]);

  return (
    <div className="p-4 w-full">
      <h1 className="text-18px py-6" id="alertas_stock">
        Alertas de stock
      </h1>
      <div className="overflow-x-auto border-[1px] rounded-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blanco">
            <tr className="[&>*]:text-center [&>*]:py-4">
              {textTable.map((item) => (
                <th key={item} className="px-6 py-3 text-left text-xs text-14px">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, i) => (
              <tr key={i} className="[&>*]:py-6 [&>*]:font-medium [&>*]:text-center ">
                <td className="px-6 py-4 font-Inter font-[400] text-[#121417] text-[14px]">
                  {item['Tipo de cilindro']}
                </td>
                <td className="px-6 py-4 text-secondary-14px text-center">{item['Stock actual']}</td>
                <td className="px-6 py-4 text-secondary-14px ">{item['Stock mínimo']}</td>
                <td className="px-6 py-4 text-secondary-14px text-center">{item['Alerta']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
