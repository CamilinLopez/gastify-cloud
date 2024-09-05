'use client';

import { RootState } from '@/redux/reducer';
import { getTablaStock } from '@/redux/slice/abastecimiento/thunks';
import { AppDispatch } from '@/redux/store';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import jwt, { JwtPayload } from 'jsonwebtoken';

export default function Tabla() {
  const dispatch: AppDispatch = useDispatch();
  const data = useSelector((state: RootState) => state.abastecimiento.tablaResponse);
  const textTable = ['Tipo de cilindro', 'Stock actual', 'Stock mínimo', 'Alerta'];

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) return undefined;
    const decoded = jwt.decode(token) as JwtPayload | null;
    const empresaId = typeof decoded === 'object' && decoded !== null ? decoded.id : undefined;

    dispatch(getTablaStock(empresaId));
  }, [dispatch]);

  return (
    <div className="p-4 w-full">
      <h1 className="text-18px py-6 dark:text-textDark" id="alertas_stock">
        Alertas de stock
      </h1>
      <div className="overflow-x-auto border-[1px] rounded-xl dark:border-borderDarck">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-borderDarck">
          <thead className="bg-blanco dark:bg-bgDark1">
            <tr className="[&>*]:text-center [&>*]:py-4">
              {textTable.map((item) => (
                <th key={item} className="px-6 py-3 text-left text-xs text-14px dark:text-textDark">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-bgDark1 dark:divide-borderDarck">
            {data.map((item, i) => (
              <tr key={i} className="[&>*]:py-6 [&>*]:font-medium [&>*]:text-center ">
                <td className="px-6 py-4 font-Inter font-[400] text-[#121417] text-[14px] dark:text-textDark">
                  {item['Tipo de cilindro']}
                </td>
                <td className="px-6 py-4 text-secondary-14px text-center dark:text-textDark">{item['Stock actual']}</td>
                <td className="px-6 py-4 text-secondary-14px dark:text-textDark">{item['Stock mínimo']}</td>
                <td className="px-6 py-4 text-secondary-14px text-center dark:text-textDark">{item['Alerta']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
