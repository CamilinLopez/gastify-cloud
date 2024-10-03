'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { crearConductor, getTablaConductores, borrarConductores } from '@/redux/slice/inventario/thunks';
import { AppDispatch } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/reducer';
import Cookies from 'js-cookie';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { validateConductores } from './validate';

export interface Conductores {
  nombre: string;
  licencia: string;
  empresaId: string;
}

export interface ErrorsConductores {
  nombre?: string;
  licencia?: string;
}

const Form = () => {
  const [form, setForm] = useState<Conductores>({
    nombre: '',
    licencia: '',
    empresaId: '',
  });
  const [errors, setErrors] = useState<ErrorsConductores>({});

  const dispatch: AppDispatch = useDispatch();

  const handleOnCahnge = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const registrar = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const token = Cookies.get('token');

    if (!token) return undefined;

    const decoded = jwt.decode(token) as JwtPayload | null;
    const empresaId = typeof decoded === 'object' && decoded !== null ? decoded.id : undefined;

    const validateErrors = validateConductores(form);
    setErrors(validateErrors);

    if (Object.keys(validateErrors).length === 0) dispatch(crearConductor({ ...form, empresaId }));
  };

  return (
    <div className="w-full">
      <form className="w-full" action="">
        <div className="w-full flex flex-col movile:flex-row">
          <div className="w-full movile:w-1/2 flex flex-col md:flex-row gap-x-2">
            <div className="w-full">
              <p className="text-16px py-2 dark:text-textDark">Nombre</p>
              <input
                name="nombre"
                value={form.nombre}
                onChange={handleOnCahnge}
                className="p-4 h-14 bg-gris-1 w-full rounded-xl dark:bg-bgDark1 dark:text-textDark"
                type="text"
                placeholder="Carlos Morales"
              />
              <p className="font-mono text-[15px] text-red-500">{errors.nombre}</p>
            </div>
            <div className="w-full">
              <p className="text-16px py-2 dark:text-textDark">Número de teléfono</p>
              <input
                name="licencia"
                value={form.licencia}
                onChange={handleOnCahnge}
                className="p-4 h-14 bg-gris-1 w-full rounded-xl dark:bg-bgDark1 dark:text-textDark"
                type="text"
                placeholder="4566866"
              />
              <p className="font-mono text-[15px] text-red-500">{errors.licencia}</p>
            </div>
          </div>
        </div>
        <button
          onClick={(e) => registrar(e)}
          className="my-6 w-full movile:w-4/12 h-12 bg-azul rounded-xl font-Inter dark:text-textDark font-[500] text-blanco">
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
    const token = Cookies.get('token');

    if (!token) return undefined;

    const decoded = jwt.decode(token) as JwtPayload | null;
    const empresaId = typeof decoded === 'object' && decoded !== null ? decoded.id : undefined;
    dispatch(getTablaConductores(empresaId));
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
              <th key={item} className="px-6 py-3 text-center text-xs text-14px dark:text-textDark whitespace-nowrap">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:divide-borderDarck dark:bg-bgDark1">
          {dataTable?.map((item, i) => (
            <tr key={i} className="text-center ">
              <td className="px-6 py-4 text-secondary-14px dark:text-textDark whitespace-nowrap">{item.fecha}</td>
              <td className="px-6 py-4 text-secondary-14px dark:text-textDark whitespace-nowrap">{item.id}</td>
              <td className="px-6 py-4 text-secondary-14px dark:text-textDark whitespace-nowrap">{item.nombre}</td>
              <td className="px-6 py-4 text-secondary-14px dark:text-textDark whitespace-nowrap">{item.licencia}</td>
              <td className="px-6 py-4 text-secondary-14px dark:text-textDark whitespace-nowrap">
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
