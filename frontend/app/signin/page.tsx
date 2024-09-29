'use client';
import Navbar from '@/components/inviteUser/navbar';
import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { LoginThunk } from '@/redux/slice/usuarios/thunks';
import { AppDispatch } from '@/redux/store';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Form = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const login = await dispatch(LoginThunk({ email, password }));

    if (login.payload.errors) {
      setError(login.payload.errors);
      return;
    }

    if (login.payload.dashboard && login.payload.token) {
      // window.location.href = login.payload.dashboard;
      router.push('/dashboard/inicio');
    }
  };

  return (
    <form className="items-start w-full flex flex-col gap-y-3" onSubmit={handleSubmit}>
      <div className="movile:w-1/2 w-full">
        <p className="text-16px">E-mail</p>
        <input
          className="h-14 w-full border-[1px] rounded-xl pl-4 pr-24"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="movile:w-1/2 w-full">
        <p className="text-16px">Password</p>
        <input
          className="h-14 w-full border-[1px] rounded-xl pl-4 pr-24"
          type="password"
          placeholder="******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="flex gap-x-3">
        <input type="checkbox" />
        <p>Remember me</p>
      </div>

      {error && <p className="text-red-500 mt-3">{error}</p>}

      <button type="submit" className="bg-azul rounded-xl font-Inter font-[500] text-blanco px-4 py-2">
        Iniciar sesión
      </button>
    </form>
  );
};

export default function Signin() {
  const apiUrl = process.env.NEXT_PUBLIC_CLIENT_URL;

  return (
    <div className="w-full flex flex-col">
      <div className="border-b-[1px]">
        <div className="px-10">
          <Navbar />
        </div>
      </div>
      <div className="movile:px-40 px-5  py-5 w-full ">
        <div className="flex flex-col gap-y-5 items-center justify-center w-full">
          <h1 className="font-Inter font-[700] movile:text-[28px] text-[21px]">Inicia sesión en Gastify Cloud</h1>
          <div className="flex flex-col w-full items-center gap-y-3">
            <button className="movile:w-1/2 w-full py-2 bg-gris-1 gap-x-2 rounded-xl text-14px">
              Inicia sesión con Google
            </button>
            <button className="movile:w-1/2 w-full py-2 bg-gris-1 gap-x-2 rounded-xl text-14px">
              Iniciar sesión con Apple
            </button>
          </div>
          <p className="text-secondary-14px">O</p>
        </div>
      </div>
      <div className="movile:px-40 px-5 w-full">
        <Form />
      </div>
      <div className="w-full flex items-center justify-center my-20 movile:my-4">
        <Link className="text-secondary-14px" href={`${apiUrl}/registrar`}>
          Registrar
        </Link>
      </div>
    </div>
  );
}
