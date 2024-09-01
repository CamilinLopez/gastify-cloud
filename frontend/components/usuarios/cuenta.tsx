'use client';

import React, { useState } from 'react';

export default function SectionCuenta() {
  const [open, setOpen] = useState<boolean>(false);

  const toggleDropdown = () => setOpen(!open);

  return (
    <div className="p-4 w-full dark:bg-bgDark">
      <div className="flex items-center justify-between">
        <h1 className="text-18px py-6 dark:text-textDark" id="registro_abastecimiento">
          Configuración de la cuenta
        </h1>
        <button
          onClick={toggleDropdown}
          className="px-2 py-2 bg-azul dark:text-textDark  rounded-sm font-Inter font-[500] text-blanco">
          Editar
        </button>
      </div>
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col justify-start">
          <p className="font-Inter text-[14px] font-semibold dark:text-textDark">ID de cuenta</p>
          <p className="font-Inter text-[14px] font-normal dark:text-textDark">479224a4</p>
        </div>
        <div className="flex flex-col justify-start">
          <p className="font-Inter text-[14px] font-semibold dark:text-textDark">Nombre de la cuenta</p>
          <p className="font-Inter text-[14px] font-normal dark:text-textDark">SuperGas</p>
        </div>
        <div className="flex flex-col justify-start">
          <p className="font-Inter text-[14px] font-semibold dark:text-textDark">Contraseña</p>
          <p className="font-Inter text-[14px] font-normal dark:text-textDark">********</p>
        </div>
      </div>
    </div>
  );
}
