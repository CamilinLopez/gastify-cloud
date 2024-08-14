'use client'
import React, { useEffect } from 'react';
import { Flechas } from '../svg/svgImages';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { PermisosThunk } from '@/redux/slice/roles/thunks';


const PrintCheckbox = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { permisos, status, error } = useSelector((state: RootState) => state.permisos);

  useEffect(() => {
    // Fetch permisos data when component mounts
    const fetchData = async () => {
      try {
        await dispatch(PermisosThunk());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);



  return (
    <div className="w-full">
{permisos.map((item) => (
  <div key={item.id} className="flex gap-x-2 my-3">
    <input type="checkbox" id={`permiso-${item.id}`} />
    <label htmlFor={`permiso-${item.id}`} className="text-16px">
      {item.nombre}
    </label>
  </div>
))}

{status === 'failed' && <p className="text-red-500">{error?.toString()}</p>}

      <button className="w-5/12 h-12 bg-azul rounded-xl font-Inter font-[500] text-blanco">
        Guardar Cambios
      </button>
    </div>
  );
};
  
  //  return (
  //   <div className="w-full">
  //     {permisos.map((item) => (
  //       <div key={item.id} className="flex gap-x-2 my-3">
  //         <input type="checkbox" />
  //         <p className="text-16px">{item.nombre}</p>
  //       </div>
  //     ))}
  //     <button className="w-5/12  h-12 bg-azul rounded-xl font-Inter font-[500] text-blanco">Guardar Cambios</button>
  //   </div>
  // );


export default function ConfiguracionUsuarios() {
  return (
    <div className="w-full p-4">
      <h1 className="text-18px py-6">Configuración de Permisos</h1>

      <div className="w-full flex flex-col gap-y-5">
        <div className="w-full">
          <p className="text-16px">Rol</p>
          <div className="relative w-5/12">
            <input className="p-4 h-14 bg-gris-1 rounded-xl w-full" type="text" placeholder="Seleccionar Rol" />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex flex-col justify-center">
              <Flechas />
            </div>
          </div>
        </div>
        <div className="w-full">
          <PrintCheckbox />
        </div>
      </div>
    </div>
  );
}
