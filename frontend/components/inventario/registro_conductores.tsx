import { registro_conductores } from '@/types/registro_conductores';
import React from 'react';

const Form = () => {
  return (
    <div className="w-full">
      <form className="w-full" action="">
        <div className="w-full flex">
          <div className="w-1/2 flex flex-col md:flex-row gap-x-2">
            <div className="w-full">
              <p className="text-16px py-2">Nombre</p>
              <input className="p-4 h-14 bg-gris-1 rounded-xl " type="text" placeholder="Nombre" />
            </div>
            <div className="w-full">
              <p className="text-16px py-2">Licencia</p>
              <input className="p-4 h-14 bg-gris-1 rounded-xl " type="text" placeholder="Licencia" />
            </div>
          </div>
        </div>
        <button className="my-6 w-4/12 h-12 bg-azul rounded-xl font-Inter font-[500] text-blanco">Registrar</button>
      </form>
    </div>
  );
};

const Tabla = () => {
  const textTable = ['Fecha De Registro', 'ID', 'Nombre de Conductor', 'Licencia'];
  const info: registro_conductores[] = [
    {
      Fecha_De_Registro: '2021-10-10',
      ID: '1203',
      Nombre: 'Juan Perez',
      Licencia: '123456',
    },
  ];
  return (
    <div className="overflow-x-auto border-[1px] rounded-xl">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-blanco">
          <tr>
            {textTable.map((item) => (
              <th key={item} className="px-6 py-3 text-center text-xs text-14px">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {info.map((item, i) => (
            <tr key={i} className="text-center ">
              <td className="px-6 py-4 text-secondary-14px ">{item.Fecha_De_Registro}</td>
              <td className="px-6 py-4 text-secondary-14px ">{item.ID}</td>
              <td className="px-6 py-4 text-secondary-14px ">{item.Nombre}</td>
              <td className="px-6 py-4 text-secondary-14px ">{item.Licencia}</td>
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
      <h3 className="text-18px py-4">Registro de conductores</h3>
      <div className="w-full">
        <Form />
      </div>
      <div className="w-full">
        <Tabla />
      </div>
    </div>
  );
}
