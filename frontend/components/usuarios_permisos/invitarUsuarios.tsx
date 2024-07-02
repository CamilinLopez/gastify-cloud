import { TablaGestiosUsuarios } from '@/types/usuarios_permisos';
import React from 'react';
import { Flechas } from '../svg/svgImages';

const Form = () => {
  return (
    <div className="w-full">
      <form className="w-full" action="">
        <div className="w-full flex items-end">
          <div className="w-8/12">
            <p className="text-16px py-2">correo electrónico</p>
            <input className="p-4 h-14 bg-gris-1 rounded-xl w-8/12" type="text" placeholder="arturo369@gmail.com" />
          </div>
          <div className="w-6/12">
            <p className="text-16px py-2">Rol</p>
            <div className="relative w-8/12">
              <input className="p-4 h-14 bg-gris-1 rounded-xl w-full" type="text" placeholder="Seleccionar" />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex flex-col justify-center">
                <Flechas />
              </div>
            </div>
          </div>

          <button className="w-1/4 h-12 bg-azul rounded-xl font-Inter font-[500] text-blanco">Enviar invitación</button>
        </div>
      </form>
    </div>
  );
};

export default function InvitarUsuarios() {
  const textTable = ['correo electrónico', 'Rol', 'Estado de invitación', 'Acciones'];

  const info: TablaGestiosUsuarios[] = [
    {
      'correo electrónico': 'camilo456@gmail.com',
      Rol: 'Administrador',
      'Estado de invitación': 'Aceptada',
      Acciones: 'Reenviar',
    },
    {
      'correo electrónico': 'camilo456@gmail.com',
      Rol: 'Administrador',
      'Estado de invitación': 'Aceptada',
      Acciones: 'Revocar',
    },
    {
      'correo electrónico': 'camilo456@gmail.com',
      Rol: 'Administrador',
      'Estado de invitación': 'Aceptada',
      Acciones: 'Revocar',
    },
  ];
  return (
    <div className="w-full p-4">
      <h1 className="text-18px py-6" id='invitar_usuarios'>Invitar usuarios</h1>

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
                  <td className="px-6 py-4 font-Inter font-[400] text-[#121417] text-[14px]">
                    {item['correo electrónico']}
                  </td>
                  <td className="px-6 py-4 text-secondary-14px ">{item['Rol']}</td>
                  <td className="px-6 py-4 text-secondary-14px ">{item['Estado de invitación']}</td>
                  <td className="px-6 py-4 text-secondary-14px ">
                    <button className="bg-azul rounded-xl font-Inter font-[500] text-blanco p-2">
                      {item['Acciones']}
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
