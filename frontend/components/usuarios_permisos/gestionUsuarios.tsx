import React from 'react';
import { Flechas } from '../svg/svgImages';

const Form = () => {
  return (
    <div className="w-full">
      <form className="w-full flex flex-col gap-y-5" action="">
        <div className="w-full flex flex-col gap-y-2">
          <p className="text-16px">ID usuario</p>
          <input className="p-4 h-14 bg-gris-1 rounded-xl w-5/12" placeholder="5879954" type="text" />
        </div>
        <div className="w-full flex flex-col gap-y-2">
          <p className="text-16px">Correo Electrónico</p>
          <input
            className="p-4 h-14 bg-gris-1 rounded-xl w-5/12 pl-4 pr-24"
            placeholder="carlos569@gmail.com"
            type="text"
          />
        </div>
        <div className="w-full">
          <p className="text-16px">Rol</p>
          <div className="relative w-5/12">
            <input className="p-4 h-14 bg-gris-1 rounded-xl w-full" type="text" placeholder="Seleccionar" />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex flex-col justify-center">
              <Flechas />
            </div>
          </div>
        </div>
        <button className="w-5/12  h-12 bg-azul rounded-xl font-Inter font-[500] text-blanco">Buscar</button>
      </form>
    </div>
  );
};

export default function GestionUsuarios() {
  const textTable = ['ID', 'Nombre', 'correo electrónico', 'Rol', 'Acciones'];

  const info = [
    {
      ID: '455f5gh22dfg',
      Nombre: 'Antonio moralez cuesta',
      'correo electrónico': 'antonito455@gmail.com',
      Rol: 'Administrador',
      Acciones: ['Eliminar', 'Guardar'],
    },
  ];
  return (
    <div className="w-full p-4">
      <h1 className="text-18px py-6" id="gestion_usuarios">
        Gestión de usuarios
      </h1>
      <div className="flex flex-col gap-y-6">
        <Form />
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
                  <td className="px-6 py-4 text-secondary-14px ">{item['ID']}</td>
                  <td className="px-6 py-4 text-secondary-14px ">{item['Nombre']}</td>
                  <td className="px-6 py-4 text-secondary-14px ">{item['correo electrónico']}</td>
                  <td className="px-6 py-4 text-secondary-14px ">{item['Rol']}</td>
                  <td className="px-6 py-4 text-secondary-14px flex gap-x-3">
                    <button className="bg-azul rounded-xl font-Inter font-[500] text-blanco p-2">
                      {item['Acciones'][0]}
                    </button>
                    <button className="bg-azul rounded-xl font-Inter font-[500] text-blanco p-2">
                      {item['Acciones'][1]}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
