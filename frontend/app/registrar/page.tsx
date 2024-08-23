'use client';
import Navbar from '@/components/inviteUser/navbar';
import { G_google } from '@/components/svg/svgImages';
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { RegistroThunk } from '@/redux/slice/usuarios/thunks';
import { AppDispatch } from '@/redux/store';
import { useRouter } from 'next/navigation';

const Form = () => {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const dispatch: AppDispatch = useDispatch();
  const { status, error, messageResponse, user } = useSelector((state: RootState) => state.usuarios);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value, // Actualiza el campo correspondiente en el objeto de estado
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formValues.password !== formValues.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const registro = await dispatch(RegistroThunk({ email: formValues.email, password: formValues.password }));

    if (registro.payload?.dashboard && typeof registro.payload.dashboard === 'string') {
      window.location.href = registro.payload.dashboard;
    }
  };

  return (
    <form className="w-full flex flex-col gap-y-7" onSubmit={handleSubmit}>
      <input
        className="h-14 w-full border-[1px] rounded-xl pl-4 pr-24"
        type="email"
        name="email" // Asegúrate de asignar un nombre único para cada input
        placeholder="E-mail"
        value={formValues.email}
        onChange={handleChange}
        required
      />
      <input
        className="h-14 w-full border-[1px] rounded-xl pl-4 pr-24"
        type="password"
        name="password" // Asegúrate de asignar un nombre único para cada input
        placeholder="Contraseña"
        value={formValues.password}
        onChange={handleChange}
        required
      />
      <input
        className="h-14 w-full border-[1px] rounded-xl pl-4 pr-24"
        type="password"
        name="confirmPassword" // Asegúrate de asignar un nombre único para cada input
        placeholder="Confirmar Contraseña"
        value={formValues.confirmPassword}
        onChange={handleChange}
        required
      />
      <button
        type="submit"
        className="bg-azul rounded-xl font-Inter font-[500] text-blanco px-4 py-2"
        disabled={status === 'loading'}>
        {status === 'loading' ? 'Cargando...' : 'Continuar'}
      </button>
      {status === 'failed' && error && <p className="text-red-500">{error?.toString()}</p>}
    </form>
  );
};
export default function Register() {
  return (
    <div className="flex flex-col gap-y-7 w-full">
      <div className="border-b-[1px]">
        <div className="px-10">
          <Navbar />
        </div>
      </div>
      <div className="w-full flex flex-col gap-y-4 items-center">
        <div className="items-start w-1/3 flex flex-col gap-y-5">
          <div className="flex flex-col items-start gap-y-2">
            <h1 className="text-24px">Empezar</h1>
            <p className="font-Inter font-[400] text-[16px]">Comience a configurar su cuenta</p>
          </div>
          <div className="w-full">
            <input
              className="h-14 w-full border-[1px] rounded-xl pl-4 pr-24"
              type="password"
              name="confirmPassword" // Asegúrate de asignar un nombre único para cada input
              placeholder="Nombre"
              // value={formValues.confirmPassword}
              // onChange={handleChange}
              required
            />
          </div>
          <div className="w-full flex justify-center">
            <p className="text-secondary-14px">|</p>
          </div>
          <div className="w-full">
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
}
