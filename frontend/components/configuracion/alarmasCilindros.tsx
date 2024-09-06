'use client';

import { tipoCilindros } from '@/arraysObjects/dataCilindros';
import { axiosInstance } from '@/config/axios';
import { ChangeEvent, useState } from 'react';

export default function AlarmasCilindros() {
  const [from, setFrom] = useState({
    '5kg': { minStock: '0', tipoCilindroId: 1 },
    '11kg': { minStock: '0', tipoCilindroId: 2 },
    '15kg': { minStock: '0', tipoCilindroId: 3 },
    '45kg': { minStock: '0', tipoCilindroId: 4 },
    H15: { minStock: '0', tipoCilindroId: 5 },
  });
  const [response, setResponse] = useState({
    status: 'idl',
    message: '',
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    setFrom({
      ...from,
      [e.target.name]: { minStock: Number(e.target.value), tipoCilindroId: id },
    });
  };
  const registrar = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = Object.values(from).filter((cilindro) => Number(cilindro.minStock) !== 0);

    setResponse({ ...response, status: 'loading' });
    axiosInstance
      .post('/alarmas/crearAlarmasCilindros', { array: data })
      .then((data) => {
        setResponse({ ...response, status: 'succeeded', message: data.data.data.message });
      })
      .catch((error) => setResponse({ ...response, status: 'failed' }))
      .finally(() => {
        setResponse({ ...response, status: 'idl' });
      });
  };

  return (
    <div className="p-4 w-full dark:bg-bgDark">
      <h1 className="text-18px py-6 dark:text-textDark" id="registro_abastecimiento">
        Configuración de alarmas para tipos de cilindros.
      </h1>
      <form className="flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-5">
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
    </div>
  );
}
