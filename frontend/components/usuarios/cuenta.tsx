'use client';

import { axiosInstance } from '@/config/axios';
import React, { ChangeEvent, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchUsuarioData } from '@/redux/slice/usuarios/usuario-data';
import { RootState, AppDispatch } from '@/redux/store';

type UsuarioType = {
  id: string;
  nombre: string;
  email: string;
  rol: {
    nombre: string;
  };
};
export default function SectionCuenta() {
  const dispatch: AppDispatch = useDispatch();
  const usuario = useSelector((state: RootState) => state.dataUser.usuario);
  const status = useSelector((state: RootState) => state.dataUser.status);

  const [open, setOpen] = useState<boolean>(true);
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    password: '',
  });

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsuarioData());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (usuario) {
      setForm({
        nombre: usuario.nombre || '',
        correo: usuario.email || '',
        password: '',
      });
    }
  }, [usuario]);

  const toggleDropdown = () => setOpen(!open);
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const registrar = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.put(`/empresa/update-user/${usuario?.id}`, {
        nombre: form.nombre,
        email: form.correo,
        password: form.password,
      });
      // console.log(response.data);

      setForm({
        nombre: response.data.data.nombre || '',
        correo: response.data.data.email || '',
        password: '', // Resetea la contraseña después de la actualización
      });
      dispatch(fetchUsuarioData());

      toggleDropdown();
    } catch (error) {
      console.error('Error al actualizar los datos del usuario:', error);
      // Puedes manejar el error aquí, por ejemplo, mostrando un mensaje al usuario
    }
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
            <p className="font-Inter text-[14px] font-normal dark:text-textDark">{usuario?.id}</p>
          </div>
          <div className="flex flex-col justify-start">
            <p className="font-Inter text-[14px] font-semibold dark:text-textDark">Nombre de la cuenta</p>
            <p className="font-Inter text-[14px] font-normal dark:text-textDark">{usuario?.nombre}</p>
          </div>
          <div className="flex flex-col justify-start">
            <p className="font-Inter text-[14px] font-semibold dark:text-textDark">Correo electrónico:</p>
            <p className="font-Inter text-[14px] font-normal dark:text-textDark">{usuario?.email}</p>
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
                name="nombre"
                value={form.nombre}
                onChange={handleOnChange}
                className="p-4 h-14 bg-gris-1 dark:text-textDark dark:bg-bgDark1 rounded-xl w-full movile:w-4/12"
                type="text"
                min="0"
                placeholder="supergas"
              />
            </div>
            <div className="flex flex-col justify-start">
              <p className="text-16px py-2 dark:text-textDark">Correo electrónico:</p>
              <input
                name="correo"
                value={form.correo}
                onChange={handleOnChange}
                className="p-4 h-14 bg-gris-1 dark:text-textDark dark:bg-bgDark1 rounded-xl w-full movile:w-4/12"
                type="email"
                min="0"
                placeholder="supergas@gmail.com"
              />
            </div>
            <div className="flex flex-col justify-start">
              <p className="text-16px py-2 dark:text-textDark">Contraseña:</p>
              <input
                name="password"
                value={form.password}
                onChange={handleOnChange}
                className="p-4 h-14 bg-gris-1 dark:text-textDark dark:bg-bgDark1 rounded-xl w-full movile:w-4/12"
                type="password"
                min="0"
                placeholder="********"
              />
            </div>
            <button
              onClick={(e) => registrar(e)}
              className="w-full movile:w-4/12 h-12 bg-azul rounded-xl font-Inter font-[500] dark:text-textDark text-blanco">
              Registrar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
