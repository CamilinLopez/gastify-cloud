'use client';

import React, { useEffect } from 'react';
import { AppDispatch } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getTablaInventarioResumen } from '@/redux/slice/inicio/thunks';
import { RootState } from '@/redux/reducer';

export default function ResumenInventario() {
  const dispatch: AppDispatch = useDispatch();
  const tabla = useSelector((state: RootState) => state.inicio.responseTablaResumenInventario.result);
  const maxValueLLenos = Math.max(...tabla?.llenos.map((item) => Number(item.totalCantidad)));
  const maxValueVacios = Math.max(...tabla?.vacios.map((item) => Number(item.totalCantidad)));

  console.log(maxValueLLenos, maxValueVacios);

  useEffect(() => {
    dispatch(getTablaInventarioResumen());
  }, [dispatch]);
  return (
    <div className="p-4 w-full">
      <h3 className="text-18px py-4" id="resumen_inventario">
        Resumen de Inventario
      </h3>
      <div className="flex w-full">
        <div className="w-1/2">
          <h4 className="text-16px">Cantidad de cilindros llenos por tipo</h4>
          {tabla.llenos.map((item, index) => (
            <div key={index} className="py-1">
              <div className="flex items-center">
                <span className="text-13px">{item.tipoCilindro.tipo}</span>
                <p>-</p>
                <p className="text-13px">{item.totalCantidad}</p>
              </div>
              <div>
                <div
                  className="pt-3 bg-gris-1 border-r-gris-2 border-2"
                  style={{ width: `${(Number(item.totalCantidad) / maxValueLLenos) * 100}px` }}></div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-1/2">
          <h4 className="text-16px">Cantidad de cilindros vacíos por tipo</h4>
          {tabla.vacios.map((item) => (
            <div key={item.tipoCilindro.tipo} className="py-1">
              <div className="flex items-center">
                <span className="text-13px">{item.tipoCilindro.tipo}</span>
                <p>-</p>
                <p className="text-13px">{item.totalCantidad}</p>
              </div>
              <div className=" rounded overflow-hidden">
                <div
                  className="pt-3 bg-gris-1 border-r-gris-2 border-2"
                  style={{ width: `${(Number(item.totalCantidad) / maxValueVacios) * 100}px` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
