import React from 'react';
import { Flechas } from '../svg/svgImages';

const PrintCheckbox = () => {
  const textCheckbox = [
    'inicio',
    'inventario',
    'operaciones diarias',
    'reportes',
    'abastecimiento',
    'usuarios y permisos',
  ];

  return (
    <div className="w-full">
      {textCheckbox.map((item) => (
        <div key={item} className="flex gap-x-2 my-3">
          <input type="checkbox" />
          <p className="text-16px">{item}</p>
        </div>
      ))}
      <button className="w-5/12  h-12 bg-azul rounded-xl font-Inter font-[500] text-blanco">Guardar Cambios</button>
    </div>
  );
};

export default function ConfiguracionUsuarios() {
  return (
    <div className="w-full p-4">
      <h1 className="text-18px py-6">Configuración de Permisos</h1>

      <div className="w-full flex flex-col gap-y-5">
        <div className="w-full">
          <p className="text-16px">Rol</p>
          <div className="relative w-5/12">
            <input className="p-4 h-14 bg-gris-1 rounded-xl w-full" type="text" placeholder="Seleccionar Rol" />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex flex-col justify-center">
              <Flechas />
            </div>
          </div>
        </div>
        <div className="w-full">
          <PrintCheckbox />
        </div>
      </div>
    </div>
  );
}
