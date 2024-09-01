'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { crearConductor, getTablaConductores, borrarConductores } from '@/redux/slice/inventario/thunks';
import { AppDispatch } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/reducer';

const Form = () => {
  const [form, setForm] = useState({
    nombre: '',
    licencia: '',
  });
  const dispatch: AppDispatch = useDispatch();

  const handleOnCahnge = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const registrar = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(crearConductor(form));
  };

  return (
    <div className="w-full">
      <form className="w-full" action="">
        <div className="w-full flex">
          <div className="w-1/2 flex flex-col md:flex-row gap-x-2">
            <div className="w-full">
              <p className="text-16px py-2 dark:text-textDark">Nombre</p>
              <input
                name="nombre"
                value={form.nombre}
                onChange={handleOnCahnge}
                className="p-4 h-14 bg-gris-1 rounded-xl dark:bg-bgDark1 dark:text-textDark"
                type="text"
                placeholder="Nombre"
              />
            </div>
            <div className="w-full">
              <p className="text-16px py-2 dark:text-textDark">Licencia</p>
              <input
                name="licencia"
                value={form.licencia}
                onChange={handleOnCahnge}
                className="p-4 h-14 bg-gris-1 rounded-xl dark:bg-bgDark1 dark:text-textDark"
                type="text"
                placeholder="Licencia"
              />
            </div>
          </div>
        </div>
        <button
          onClick={(e) => registrar(e)}
          className="my-6 w-4/12 h-12 bg-azul rounded-xl font-Inter dark:text-textDark font-[500] text-blanco">
          Registrar
        </button>
      </form>
    </div>
  );
};

const Tabla = () => {
  const dispatch: AppDispatch = useDispatch();
  const textTable = ['Fecha De Registro', 'ID', 'Nombre de Conductor', 'Licencia', 'Acciones'];
  const dataTable = useSelector((state: RootState) => state.inventario.sectionConductores.tabla);

  useEffect(() => {
    dispatch(getTablaConductores());
  }, [dispatch]);

  const deleteConductores = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    dispatch(borrarConductores(id));
  };

  return (
    <div className="overflow-x-auto border-[1px] rounded-xl dark:border-borderDarck">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-borderDarck">
        <thead className="bg-blanco dark:bg-bgDark1">
          <tr>
            {textTable.map((item) => (
              <th key={item} className="px-6 py-3 text-center text-xs text-14px dark:text-textDark">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:divide-borderDarck dark:bg-bgDark1">
          {dataTable?.map((item, i) => (
            <tr key={i} className="text-center ">
              <td className="px-6 py-4 text-secondary-14px dark:text-textDark">{item.fecha}</td>
              <td className="px-6 py-4 text-secondary-14px dark:text-textDark">{item.id}</td>
              <td className="px-6 py-4 text-secondary-14px dark:text-textDark">{item.nombre}</td>
              <td className="px-6 py-4 text-secondary-14px dark:text-textDark">{item.licencia}</td>
              <td className="px-6 py-4 text-secondary-14px dark:text-textDark">
                <button
                  onClick={(e) => deleteConductores(e, item.id)}
                  className="bg-azul rounded-xl dark:text-textDark font-Inter font-[500] text-blanco py-1 px-2">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function Registro_conductores() {
  return (
    <div className="p-4 w-full">
      <h3 className="text-18px py-4 dark:text-textDark">Registro de conductores</h3>
      <div className="w-full">
        <Form />
      </div>
      <div className="w-full">
        <Tabla />
      </div>
    </div>
  );
}
