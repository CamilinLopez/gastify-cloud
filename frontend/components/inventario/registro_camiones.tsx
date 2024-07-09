import { DatosCamiones } from '@/types/inventario_camiones';
import React from 'react';

const Form = () => {
  return (
    <div className="w-full">
      <form className="w-full" action="">
        <div className="w-full flex">
          <div className="w-1/2 flex flex-col gap-y-2">
            <div className="w-full">
              <p className="text-16px py-2">Marca del Camión</p>
              <input className="p-4 h-14 bg-gris-1 rounded-xl w-8/12" type="text" placeholder="Toyota" />
            </div>

            <div className="w-full">
              <p className="text-16px py-2">Modelo del Camión</p>
              <input className="p-4 h-14 bg-gris-1 rounded-xl w-8/12" type="text" placeholder="Hilux" />
            </div>
          </div>
          <div className="w-1/2 flex flex-col gap-y-2">
            <div className="w-full">
              <p className="text-16px py-2">Capacidad de Carga (kg)</p>
              <input className="p-4 h-14 bg-gris-1 rounded-xl w-8/12" type="text" placeholder="10.000" />
            </div>
            <div className="w-full">
              <p className="text-16px py-2">Placa del Camión:</p>
              <input className="p-4 h-14 bg-gris-1 rounded-xl w-8/12" type="text" placeholder="XYZ456" />
            </div>
          </div>
        </div>
        <button className="my-6 w-4/12 h-12 bg-azul rounded-xl font-Inter font-[500] text-blanco">Registrar</button>
      </form>
    </div>
  );
};

const Tabla = () => {
  const textTable = [
    'Fecha de Registro',
    'Marca del Camión',
    'Modelo del Camión',
    'Capacidad de Carga (kg)',
    'Placa del Camión',
    'Acción',
  ];
  const info: DatosCamiones[] = [
    {
      'Fecha de Registro': '22/06/2015',
      'Marca del Camión': 'Toyota',
      'Modelo del Camión': 'hilux',
      'Capacidad de Carga (kg)': 5000,
      'Placa del Camión': 'fgh456',
    },
  ];
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
          {info.map((item, i) => (
            <tr key={i}>
              <td className="px-6 py-4 font-Inter font-[400] text-[#121417] text-[14px]">
                {item['Fecha de Registro']}
              </td>
              <td className="px-6 py-4 text-secondary-14px ">{item['Marca del Camión']}</td>
              <td className="px-6 py-4 text-secondary-14px ">{item['Modelo del Camión']}</td>
              <td className="px-6 py-4 text-secondary-14px ">{item['Capacidad de Carga (kg)']}</td>
              <td className="px-6 py-4 text-secondary-14px ">{item['Placa del Camión']}</td>
              <td className="px-6 py-4 text-secondary-14px ">
                <button className="bg-azul rounded-xl font-Inter font-[500] text-blanco py-1 px-2">Eliminar</button>{' '}
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
