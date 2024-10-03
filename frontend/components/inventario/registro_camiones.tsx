'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { AppDispatch } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { crearCamion, tablaCamion, borrarCamiones } from '@/redux/slice/inventario/thunks';
import { DatosCamiones, ErrorsForms } from '@/types/inventario_camiones';
import { RootState } from '@/redux/reducer';
import Cookies from 'js-cookie';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { validateCamiones } from './validate';

const Form = () => {
  const dispatch: AppDispatch = useDispatch();
  const response = useSelector((state: RootState) => state.inventario.status);
  console.log(response);

  const [form, setForm] = useState<DatosCamiones>({
    id: '',
    marca: '',
    modelo: '',
    capacidad_carga: 0,
    placa: '',
    empresaId: '',
  });
  const [errors, setErrors] = useState<ErrorsForms>({});

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
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

    const validateErrors = validateCamiones(form);
    setErrors(validateErrors);

    if (Object.keys(validateErrors).length === 0) {
      dispatch(crearCamion({ ...form, empresaId }));
    }
  };

  return (
    <div className="w-full">
      <form className="w-full" action="">
        <div className="w-full flex flex-col space-y-2 movile:space-y-0 movile:flex-row">
          <div className="w-full movile:w-1/2 flex flex-col gap-y-2">
            <div className="w-full">
              <p className="text-16px py-2 dark:text-textDark">Marca del Camión</p>
              <input
                name="marca"
                value={form.marca}
                onChange={handleOnChange}
                className="p-4 h-14 bg-gris-1 rounded-xl w-full movile:w-8/12 dark:bg-bgDark1 dark:text-textDark"
                type="text"
                placeholder="Toyota"
              />
              <p className="font-mono text-[15px] text-red-500">{errors.marca}</p>
            </div>

            <div className="w-full">
              <p className="text-16px py-2 dark:text-textDark">Modelo del Camión</p>
              <input
                name="modelo"
                value={form.modelo}
                onChange={handleOnChange}
                className="p-4 h-14 bg-gris-1 rounded-xl w-full movile:w-8/12 dark:bg-bgDark1 dark:text-textDark"
                type="date"
                placeholder="2011"
              />
              <p className="font-mono text-[15px] text-red-500">{errors.modelo}</p>
            </div>
          </div>
          <div className="w-full  movile:w-1/2 flex flex-col gap-y-2">
            <div className="w-full">
              <p className="text-16px py-2 dark:text-textDark">Capacidad de Carga (kg)</p>
              <input
                name="capacidad_carga"
                value={form.capacidad_carga}
                onChange={handleOnChange}
                className="p-4 h-14 bg-gris-1 rounded-xl w-full movile:w-8/12 dark:bg-bgDark1 dark:text-textDark"
                type="text"
                placeholder="10.000"
              />
              <p className="font-mono text-[15px] text-red-500">{errors.capacidad_carga}</p>
            </div>
            <div className="w-full">
              <p className="text-16px py-2 dark:text-textDark">Patente del camión:</p>
              <input
                name="placa"
                value={form.placa}
                onChange={handleOnChange}
                className="p-4 h-14 bg-gris-1 rounded-xl w-full movile:w-8/12 dark:bg-bgDark1 dark:text-textDark"
                type="text"
                placeholder="XYZ456"
              />
              <p className="font-mono text-[15px] text-red-500">{errors.placa}</p>
            </div>
          </div>
        </div>
        <button
          onClick={(e) => registrar(e)}
          className="my-6 w-full movile:w-4/12 h-12 bg-azul dark:text-textDark rounded-xl font-Inter font-[500] text-blanco">
          {response === 'loading' ? 'Cargando...' : 'Registrar'}
        </button>
      </form>
    </div>
  );
};

const Tabla = () => {
  const dispatch: AppDispatch = useDispatch();
  const textTable = [
    'Fecha de Registro',
    'Marca del Camión',
    'Modelo del Camión',
    'Capacidad de Carga (kg)',
    'Placa del Camión',
    'Acción',
  ];

  useEffect(() => {
    const token = Cookies.get('token');

    if (!token) return undefined;

    const decoded = jwt.decode(token) as JwtPayload | null;
    const empresaId = typeof decoded === 'object' && decoded !== null ? decoded.id : undefined;
    dispatch(tablaCamion(empresaId));
  }, [dispatch]);

  const deleteCamones = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    dispatch(borrarCamiones(id));
  };
  const data = useSelector((state: RootState) => state.inventario.sectionCamiones.tabla);

  return (
    <div className="overflow-x-auto border-[1px] rounded-xl dark:border-borderDarck">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-borderDarck">
        <thead className="bg-blanco dark:bg-bgDark1">
          <tr>
            {textTable.map((item) => (
              <th key={item} className="px-6 py-4 text-left text-xs text-14px dark:text-textDark whitespace-nowrap">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        {data.length ? (
          <tbody className="bg-white divide-y divide-gray-200 dark:divide-borderDarck dark:bg-bgDark1">
            {data.map((item, i) => (
              <tr key={i}>
                <td className="px-6 py-4 font-Inter font-[400] text-[#121417] text-[14px] dark:text-textDark whitespace-nowrap">
                  {item.fecha}
                </td>
                <td className="px-6 py-4 text-secondary-14px dark:text-textDark whitespace-nowrap">{item.marca}</td>
                <td className="px-6 py-4 text-secondary-14px dark:text-textDark whitespace-nowrap">{item.modelo}</td>
                <td className="px-6 py-4 text-secondary-14px dark:text-textDark whitespace-nowrap">
                  {item.capacidad_carga}
                </td>
                <td className="px-6 py-4 text-secondary-14px dark:text-textDark whitespace-nowrap">{item.placa}</td>
                <td className="px-6 py-4 text-secondary-14px dark:text-textDark whitespace-nowrap">
                  <button
                    onClick={(e) => deleteCamones(e, item.id)}
                    className="bg-azul rounded-xl font-Inter font-[500] text-blanco py-2 px-4">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody className="bg-white dark:bg-bgDark1">
            <tr>
              <td colSpan={6} className="px-6 py-4 text-center align-middle text-secondary-14px dark:text-textDark">
                No hay datos disponibles
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default function Registro_camiones() {
  return (
    <div className="p-4 w-full">
      <h3 className="text-18px py-4 dark:text-textDark">Registro de camiones</h3>
      <div className="w-full">
        <Form />
      </div>
      <div className="w-full">
        <Tabla />
      </div>
    </div>
  );
}
