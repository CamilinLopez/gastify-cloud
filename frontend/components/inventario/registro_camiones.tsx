'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { AppDispatch } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { crearCamion, tablaCamion, borrarCamiones } from '@/redux/slice/inventario/thunks';
import { DatosCamiones } from '@/types/inventario_camiones';
import { RootState } from '@/redux/reducer';

const Form = () => {
  const dispatch: AppDispatch = useDispatch();

  const [form, setForm] = useState<DatosCamiones>({
    id: '',
    marca: '',
    modelo: '',
    capacidad_carga: 0,
    placa: '',
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const registrar = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(crearCamion(form));
  };

  return (
    <div className="w-full">
      <form className="w-full" action="">
        <div className="w-full flex">
          <div className="w-1/2 flex flex-col gap-y-2">
            <div className="w-full">
              <p className="text-16px py-2">Marca del Camión</p>
              <input
                name="marca"
                value={form.marca}
                onChange={handleOnChange}
                className="p-4 h-14 bg-gris-1 rounded-xl w-8/12"
                type="text"
                placeholder="Toyota"
              />
            </div>

            <div className="w-full">
              <p className="text-16px py-2">Modelo del Camión</p>
              <input
                name="modelo"
                value={form.modelo}
                onChange={handleOnChange}
                className="p-4 h-14 bg-gris-1 rounded-xl w-8/12"
                type="date"
                placeholder="2011"
              />
            </div>
          </div>
          <div className="w-1/2 flex flex-col gap-y-2">
            <div className="w-full">
              <p className="text-16px py-2">Capacidad de Carga (kg)</p>
              <input
                name="capacidad_carga"
                value={form.capacidad_carga}
                onChange={handleOnChange}
                className="p-4 h-14 bg-gris-1 rounded-xl w-8/12"
                type="text"
                placeholder="10.000"
              />
            </div>
            <div className="w-full">
              <p className="text-16px py-2">Placa del Camión:</p>
              <input
                name="placa"
                value={form.placa}
                onChange={handleOnChange}
                className="p-4 h-14 bg-gris-1 rounded-xl w-8/12"
                type="text"
                placeholder="XYZ456"
              />
            </div>
          </div>
        </div>
        <button
          onClick={(e) => registrar(e)}
          className="my-6 w-4/12 h-12 bg-azul rounded-xl font-Inter font-[500] text-blanco">
          Registrar
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
    dispatch(tablaCamion());
  }, [dispatch]);

  const deleteCamones = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    dispatch(borrarCamiones(id));
  };
  const data = useSelector((state: RootState) => state.inventario.sectionCamiones.tabla);

  return (
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
          {data.map((item, i) => (
            <tr key={i}>
              <td className="px-6 py-4 font-Inter font-[400] text-[#121417] text-[14px]">{item.fecha}</td>
              <td className="px-6 py-4 text-secondary-14px ">{item.marca}</td>
              <td className="px-6 py-4 text-secondary-14px ">{item.modelo}</td>
              <td className="px-6 py-4 text-secondary-14px ">{item.capacidad_carga}</td>
              <td className="px-6 py-4 text-secondary-14px ">{item.placa}</td>
              <td className="px-6 py-4 text-secondary-14px ">
                <button
                  onClick={(e) => deleteCamones(e, item.id)}
                  className="bg-azul rounded-xl font-Inter font-[500] text-blanco py-1 px-2">
                  Eliminar
                </button>{' '}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function Registro_camiones() {
  return (
    <div className="p-4 w-full">
      <h3 className="text-18px py-4">Registro de camiones</h3>
      <div className="w-full">
        <Form />
      </div>
      <div className="w-full">
        <Tabla />
      </div>
    </div>
  );
}
