'use client';

import React, { useEffect } from 'react';
import { AppDispatch } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getTablaInventarioResumen } from '@/redux/slice/inicio/thunks';
import { RootState } from '@/redux/reducer';
import Cookies from 'js-cookie';
import jwt, { JwtPayload } from 'jsonwebtoken';

export default function ResumenInventario() {
  const dispatch: AppDispatch = useDispatch();
  const tabla = useSelector((state: RootState) => state.inicio.responseTablaResumenInventario.result);
  const maxValueLLenos = Math.max(...tabla?.llenos.map((item) => Number(item.totalCantidad)));
  const maxValueVacios = Math.max(...tabla?.vacios.map((item) => Number(item.totalCantidad)));

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) return undefined;
    const decoded = jwt.decode(token) as JwtPayload | null;
    let empresaId = typeof decoded === 'object' && decoded !== null ? decoded.empresaId : undefined;
    const userId = typeof decoded === 'object' && decoded !== null ? decoded.id : undefined;
    if (!empresaId) empresaId = userId; // en caso de que empresaId no tenga nada, el id de la empresa se queda en userId
    dispatch(getTablaInventarioResumen(empresaId));
  }, [dispatch]);
  return (
    <div className="p-4 w-full">
      <h3 className="text-18px py-4 dark:text-textDark" id="resumen_inventario">
        Resumen de Inventario
      </h3>
      <div className="flex flex-col movile:flex-row w-full gap-x-8 space-y-4 movile:space-y-0">
        <div className="w-full movile:w-1/2">
          <h4 className="text-16px dark:text-textDark">Cantidad de cilindros llenos por tipo</h4>
          {tabla.llenos.map((item, index) => (
            <div key={index} className="py-1">
              <div className="flex items-center">
                <span className="text-13px dark:text-textDark">{item.tipoCilindro.tipo}</span>
                <p className="dark:text-textDark">-</p>
                <p className="text-13px dark:text-textDark">{item.totalCantidad}</p>
              </div>
              <div>
                <div
                  className="pt-3 bg-gris-1 dark:bg-azul dark:border-0 border-r-gris-2 border-2"
                  style={{ width: `${(Number(item.totalCantidad) / maxValueLLenos) * 100}px` }}></div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full movile:w-1/2">
          <h4 className="text-16px dark:text-textDark">Cantidad de cilindros vacíos por tipo</h4>
          {tabla.vacios.map((item) => (
            <div key={item.tipoCilindro.tipo} className="py-1">
              <div className="flex items-center">
                <span className="text-13px dark:text-textDark">{item.tipoCilindro.tipo}</span>
                <p className="dark:text-textDark">-</p>
                <p className="text-13px dark:text-textDark ">{item.totalCantidad}</p>
              </div>
              <div>
                <div
                  className="pt-3 bg-gris-1 dark:bg-azul dark:border-0 border-r-gris-2 border-2"
                  style={{ width: `${(Number(item.totalCantidad) / maxValueVacios) * 100}px` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
