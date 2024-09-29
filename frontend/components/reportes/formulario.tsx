'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { AutocompletableConductores } from './desplegable';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { RootState } from '@/redux/reducer';
import { getTablaConductores } from '@/redux/slice/inventario/thunks';
import { BuscarReportesForm } from '@/types/reportes';
import { GetTablaReportes } from '@/redux/slice/reportes/thunks';
import Cookies from 'js-cookie';
import jwt, { JwtPayload } from 'jsonwebtoken';

export default function Formulario() {
  const dispatch: AppDispatch = useDispatch();
  const conductores = useSelector((state: RootState) => state.inventario.sectionConductores.tabla);
  const [form, setForm] = useState<BuscarReportesForm>({
    fecha: '',
    conductor: { id: '', nombre: '' },
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      fecha: value,
    });
  };

  const buscar = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const token = Cookies.get('token');
    if (!token) return undefined;
    const decoded = jwt.decode(token) as JwtPayload | null;
    const empresaId = typeof decoded === 'object' && decoded !== null ? decoded.id : undefined;

    const data = { fecha: form.fecha, conductor_id: form.conductor.id, empresaId };
    dispatch(GetTablaReportes(data));
  };

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) return undefined;
    const decoded = jwt.decode(token) as JwtPayload | null;
    const empresaId = typeof decoded === 'object' && decoded !== null ? decoded.id : undefined;

    dispatch(getTablaConductores(empresaId));
  }, [dispatch]);

  return (
    <div className="p-2 movile:p-4 w-full">
      <h3 className="text-18px py-6 dark:text-textDark" id="filtro_reportes_diarios">
        Filtro de Reportes Diarios
      </h3>

      <div>
        <form className="w-full flex flex-col gap-y-5" action="">
          <div className="w-full flex flex-col gap-y-2">
            <p className="text-16px dark:text-textDark">Fecha</p>
            <input
              name="fecha"
              value={form.fecha}
              onChange={handleOnChange}
              className="p-4 h-14 dark:text-textDark dark:bg-bgDark1 bg-gris-1 rounded-xl w-full movile:w-5/12"
              type="date"
            />
          </div>
          <div className="w-full flex flex-col gap-y-2">
            <p className="text-16px dark:text-textDark">Nombre Conductor</p>
            <AutocompletableConductores
              conductores={conductores}
              name="conductor"
              form={form}
              setForm={setForm}
              placeholder="Carlos Lopez"
            />
          </div>
          <button
            onClick={(e) => buscar(e)}
            className="my-6 w-full movile:w-5/12 h-12 bg-azul dark:text-textDark rounded-xl font-Inter font-[500] text-blanco">
            Buscar
          </button>
        </form>
      </div>
    </div>
  );
}
