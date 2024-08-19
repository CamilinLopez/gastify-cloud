'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/reducer';
import { AppDispatch } from '@/redux/store';
import { GetTablaReportes } from '@/redux/slice/reportes/thunks';

export default function Tabla() {
  const dispatch: AppDispatch = useDispatch();
  const tabla = useSelector((state: RootState) => state.reportes.responseTablaReportes.result);

  useEffect(() => {
    dispatch(GetTablaReportes({ fecha: '', conductor_id: '' }));
  }, [dispatch]);

  const textTable = ['Fecha', 'Nombre Conductor', '5kg', '11kg', '15kg', '45kg', 'H15', 'Total kilos vendidos'];
  return (
    <div className="p-4 w-full">
      <h1 className="text-18px py-6" id="resumen_reportes_diarios">
        Resumen de Reportes Diarios
      </h1>
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
            {tabla?.map((item, i) => (
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
