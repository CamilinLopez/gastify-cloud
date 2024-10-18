'use client';

import React, { useEffect, useState } from 'react';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ejecuta esto solo en el cliente
  }, []);

  if (!isClient) return null; // Evita renderizar en el servidor

  const bodegas = ['salamanca', 'barsa'];
  return (
    <div className="relative w-auto">
      <button
        className="bg-azul text-blanco p-2 rounded-md flex space-x-2 items-center"
        onClick={() => setIsOpen(!isOpen)}>
        <p className="font-Inter font-[500] text-blanco">Selecciona una Bodega</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-52 dark:text-textDark dark:bg-bgDark1 bg-white border border-gray-300 rounded-md shadow-lg">
          {bodegas.map((option, id) => (
            <div key={id} className="p-2 hover:bg-gray-500 cursor-pointer">
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Tabla() {
  const cilindros = ['5kg', '11kg', '15kg', '45kg', 'H15'];

  return (
    <div className="p-4 w-full flex flex-col space-y-3">
      <div>
        <h1 className="text-18px py-6 dark:text-textDark" id="registro_abastecimiento">
          Registro de abastecimiento
        </h1>
      </div>
      <div className="overflow-x-auto border-[1px] dark:bg-bgDark1 rounded-xl dark:border-borderDarck">
        <table className="min-w-full divide-y dark:divide-borderDarck divide-gray-200">
          <thead className="bg-blanco dark:bg-bgDark1">
            <tr>
              {cilindros.map((item) => (
                <th key={item} className="px-6 py-3 text-left text-xs text-14px dark:text-textDark">
                  {item}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-bgDark1 dark:divide-borderDarck divide-y divide-gray-200">
            <tr>
              <td className="px-7 py-4 text-secondary-14px dark:text-textDark">
                <input
                  type="number"
                  className="w-12 bg-bgDark1 border-bgDark1 border-[1px] hover:border-borderDarck rounded-md pl-1"
                  placeholder="0"
                />
              </td>
              <td className="px-7 py-4 text-secondary-14px dark:text-textDark">
                <input
                  type="number"
                  className="w-12 bg-bgDark1 border-bgDark1 border-[1px] hover:border-borderDarck rounded-md pl-1"
                  placeholder="0"
                />
              </td>
              <td className="px-7 py-4 text-secondary-14px dark:text-textDark">
                <input
                  type="number"
                  className="w-12 bg-bgDark1 border-bgDark1 border-[1px] hover:border-borderDarck rounded-md pl-1"
                  placeholder="0"
                />
              </td>
              <td className="px-7 py-4 text-secondary-14px dark:text-textDark">
                <input
                  type="number"
                  className="w-12 bg-bgDark1 border-bgDark1 border-[1px] hover:border-borderDarck rounded-md pl-1"
                  placeholder="0"
                />
              </td>
              <td className="px-7 py-4 text-secondary-14px dark:text-textDark">
                <input
                  type="number"
                  className="w-12 bg-bgDark1 border-bgDark1 border-[1px] hover:border-borderDarck rounded-md pl-1"
                  placeholder="0"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="px-2 py-2 border-b-[1px] border-borderDarck flex space-x-8">
        <Dropdown />
        <button className="text-blanco bg-azul rounded-md p-2 font-Inter font-[500]">Guardar</button>
      </div>
    </div>
  );
}
