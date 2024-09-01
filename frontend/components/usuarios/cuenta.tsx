'use client';

import React, { ChangeEvent, useState } from 'react';

export default function SectionCuenta() {
  const [open, setOpen] = useState<boolean>(false);
  const [form, setForm] = useState({
    Nombre: '',
    Correo: '',
    Contraseña: '',
  });

  const toggleDropdown = () => setOpen(!open);
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const registrar = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    //eviar formulario para actualizar cuaneta

    toggleDropdown();
  };

  return (
    <div className="p-4 w-full dark:bg-bgDark">
      <div className="flex items-center justify-between">
        <h1 className="text-18px py-6 dark:text-textDark" id="registro_abastecimiento">
          Configuración de la cuenta
        </h1>
        <button
          onClick={toggleDropdown}
          className={`px-2 py-2 ${open ? 'block' : 'hidden'} bg-azul dark:text-textDark  rounded-sm font-Inter font-[500] text-blanco`}>
          Editar
        </button>
      </div>

      {open ? (
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
            <p className="font-Inter text-[14px] font-semibold dark:text-textDark">Correo electrónico:</p>
            <p className="font-Inter text-[14px] font-normal dark:text-textDark">supergas@gmail.com</p>
          </div>
          <div className="flex flex-col justify-start">
            <p className="font-Inter text-[14px] font-semibold dark:text-textDark">Contraseña</p>
            <p className="font-Inter text-[14px] font-normal dark:text-textDark">********</p>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-18px py-6 dark:text-textDark" id="registro_abastecimiento">
            Actualizar la configuración de la cuenta
          </h1>
          <form action="" className="flex flex-col gap-y-5">
            <div className="flex flex-col justify-start">
              <p className="text-16px py-2 dark:text-textDark">Nombre:</p>
              <input
                name="Nombre"
                value={form.Nombre}
                onChange={handleOnChange}
                className="p-4 h-14 bg-gris-1 dark:text-textDark dark:bg-bgDark1 rounded-xl w-4/12"
                type="number"
                min="0"
                placeholder="supergas"
              />
            </div>
            <div className="flex flex-col justify-start">
              <p className="text-16px py-2 dark:text-textDark">Correo electrónico:</p>
              <input
                name="Correo"
                value={form.Correo}
                onChange={handleOnChange}
                className="p-4 h-14 bg-gris-1 dark:text-textDark dark:bg-bgDark1 rounded-xl w-4/12"
                type="number"
                min="0"
                placeholder="supergas@gmail.com"
              />
            </div>
            <div className="flex flex-col justify-start">
              <p className="text-16px py-2 dark:text-textDark">Contraseña:</p>
              <input
                name="Contraseña"
                value={form.Contraseña}
                onChange={handleOnChange}
                className="p-4 h-14 bg-gris-1 dark:text-textDark dark:bg-bgDark1 rounded-xl w-4/12"
                type="number"
                min="0"
                placeholder="********"
              />
            </div>
            <button
              onClick={(e) => registrar(e)}
              className="w-4/12 h-12 bg-azul rounded-xl font-Inter font-[500] dark:text-textDark text-blanco">
              Registrar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
