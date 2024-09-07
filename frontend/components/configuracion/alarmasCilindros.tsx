'use client';

import { tipoCilindros } from '@/arraysObjects/dataCilindros';
import { axiosInstance } from '@/config/axios';
import { ChangeEvent, useEffect, useState } from 'react';
import jwt, { JwtPayload } from 'jsonwebtoken';
import Cookies from 'js-cookie';
import { data } from '@/arraysObjects/resumen_ventas';

interface AlarmasDb {
  empresaId: string;
  id: string | number;
  minStock: string | number;
  tipoCilindroId: string | number;
}

export default function AlarmasCilindros() {
  const [from, setFrom] = useState({
    '5kg': { minStock: '', tipoCilindroId: 1 },
    '11kg': { minStock: '', tipoCilindroId: 2 },
    '15kg': { minStock: '', tipoCilindroId: 3 },
    '45kg': { minStock: '', tipoCilindroId: 4 },
    H15: { minStock: '', tipoCilindroId: 5 },
  });
  const [response, setResponse] = useState({
    status: 'idl',
    message: '',
  });
  const [open, setOpen] = useState<boolean>(true);
  const [alarmasdb, setAlarmasdb] = useState<AlarmasDb[]>([]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    setFrom({
      ...from,
      [e.target.name]: { minStock: Number(e.target.value), tipoCilindroId: id },
    });
  };
  const registrar = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const token = Cookies.get('token');
    if (!token) return undefined;
    const decoded = jwt.decode(token) as JwtPayload | null;
    const empresaId = typeof decoded === 'object' && decoded !== null ? decoded.id : undefined;

    const data = Object.values(from).filter((cilindro) => Number(cilindro.minStock) !== 0);

    setResponse({ ...response, status: 'loading' });
    await axiosInstance
      .post('/alarmas/crearAlarmasCilindros', { array: data, empresaId })
      .then((data) => {
        setResponse({ ...response, status: 'succeeded', message: data.data.data.message });
      })
      .catch((error) => setResponse({ ...response, status: 'failed' }))
      .finally(() => {
        setResponse({ ...response, status: 'idl' });
      });
    await axiosInstance
      .get('/alarmas/leerAlarmas', { params: { empresaId } })
      .then((data) => setAlarmasdb(data.data.data.result))
      .catch((error) => console.log(error));
    toggleDropdown();
  };
  const toggleDropdown = () => setOpen(!open);

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) return undefined;
    const decoded = jwt.decode(token) as JwtPayload | null;
    const empresaId = typeof decoded === 'object' && decoded !== null ? decoded.id : undefined;
    axiosInstance
      .get('/alarmas/leerAlarmas', { params: { empresaId } })
      .then((data) => setAlarmasdb(data.data.data.result))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="p-4 w-full dark:bg-bgDark">
      <div className="flex items-center justify-between">
        <h1 className="text-18px py-6 dark:text-textDark" id="registro_abastecimiento">
          Configuración de alarmas para tipos de cilindros.
        </h1>
        <button
          onClick={toggleDropdown}
          className={`px-2 py-2 ${open ? 'block' : 'hidden'} bg-azul dark:text-textDark  rounded-sm font-Inter font-[500] text-blanco`}>
          Editar
        </button>
      </div>
      {open ? (
        <div>
          {alarmasdb?.map((item, i) => (
            <div key={i}>
              <p className="text-16px py-2 dark:text-textDark">
                {item.tipoCilindroId === 1 && <label>5kg: {item.minStock}</label>}
                {item.tipoCilindroId === 2 && <label>11kg: {item.minStock}</label>}
                {item.tipoCilindroId === 3 && <label>15kg: {item.minStock}</label>}
                {item.tipoCilindroId === 4 && <label>45kg: {item.minStock}</label>}
                {item.tipoCilindroId === 5 && <label>H15: {item.minStock}</label>}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <form className="flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-5 justify-center">
            {tipoCilindros.map((item) => (
              <div key={item.id} className="w-20 flex gap-x-5">
                <p className="text-16px py-2 dark:text-textDark">{item.tipo}:</p>
                <input
                  name={item.tipo}
                  value={from[item.tipo].minStock}
                  onChange={(e) => handleOnChange(e, item.id)}
                  type="text"
                  className="w-16 dark:bg-bgDark1 dark:text-textDark dark:border-none text-sm border-2 border-gray-300 rounded-md outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>
            ))}
          </div>

          <button
            onClick={(e) => registrar(e)}
            className="w-5/12 h-12 bg-azul dark:text-textDark  rounded-xl font-Inter font-[500] text-blanco">
            {response.status === 'loading' ? 'Cargando...' : 'Registrar'}
          </button>
        </form>
      )}
    </div>
  );
}
