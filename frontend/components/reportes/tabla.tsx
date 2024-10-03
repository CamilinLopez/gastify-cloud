'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/reducer';
import { AppDispatch } from '@/redux/store';
import { GetTablaReportes } from '@/redux/slice/reportes/thunks';
import Cookies from 'js-cookie';
import jwt, { JwtPayload } from 'jsonwebtoken';

export default function Tabla() {
  const dispatch: AppDispatch = useDispatch();
  const tabla = useSelector((state: RootState) => state.reportes.responseTablaReportes.result);

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) return undefined;
    const decoded = jwt.decode(token) as JwtPayload | null;
    const empresaId = typeof decoded === 'object' && decoded !== null ? decoded.id : undefined;
    dispatch(GetTablaReportes({ fecha: '', conductor_id: '', empresaId }));
  }, [dispatch]);

  const textTable = ['Fecha', 'Nombre Conductor', '5kg', '11kg', '15kg', '45kg', 'H15', 'Total kilos vendidos'];
  return (
    <div className="p-4 w-full">
      <h1 className="text-18px py-6 dark:text-textDark" id="resumen_reportes_diarios">
        Resumen de Reportes Diarios
      </h1>
      <div className="overflow-x-auto border-[1px] dark:bg-bgDark1 rounded-xl dark:border-borderDarck">
        <table className="min-w-full divide-y dark:divide-borderDarck divide-gray-200">
          <thead className="bg-blanco dark:bg-bgDark1">
            <tr>
              {textTable.map((item) => (
                <th key={item} className="px-6 py-3 text-left text-xs text-14px dark:text-textDark">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          {tabla.length ? (
            <tbody className="bg-white dark:bg-bgDark1 dark:divide-borderDarck divide-y divide-gray-200">
              {tabla?.map((item, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 font-Inter font-[400] text-[#121417] text-[14px] dark:text-textDark">
                    {item.Fecha}
                  </td>
                  <td className="px-6 py-4 text-secondary-14px dark:text-textDark">{item['ID Conductor']}</td>
                  <td className="px-6 py-4 text-secondary-14px dark:text-textDark">{item['5kg']}</td>
                  <td className="px-6 py-4 text-secondary-14px dark:text-textDark">{item['11kg']}</td>
                  <td className="px-6 py-4 text-secondary-14px dark:text-textDark">{item['15kg']}</td>
                  <td className="px-6 py-4 text-secondary-14px dark:text-textDark">{item['45kg']}</td>
                  <td className="px-6 py-4 text-secondary-14px dark:text-textDark">{item.H15}</td>
                  <td className="px-6 py-4 text-secondary-14px dark:text-textDark">{item['Total kilos vendidos']}</td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody className="bg-white dark:bg-bgDark1">
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center align-middle text-secondary-14px dark:text-textDark">
                  No hay datos
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
