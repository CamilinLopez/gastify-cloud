import Navbar from '@/components/inviteUser/navbar';
import React from 'react';

const Form = () => {
  return (
    <div className="w-1/3 flex flex-col gap-y-3">
      <div>
        <p className="text-16px">E-mail</p>
        <input className="h-14 w-full border-[1px] rounded-xl pl-4 pr-24" type="email" placeholder="you@example.com" />
      </div>
      <div>
        <p className="tex-16px">Password</p>
        <input className="h-14 w-full border-[1px] rounded-xl pl-4 pr-24" type="password" placeholder="" />
      </div>
      <div className="flex gap-x-3">
        <input type="checkbox" />
        <p>Remember me</p>
      </div>
      <button className="bg-azul rounded-xl font-Inter font-[500] text-blanco px-4 py-2">Iniciar sesión</button>
    </div>
  );
};

export default function Signin() {
  return (
    <div className="w-full flex flex-col">
      <div className="border-b-[1px]">
        <div className="px-10">
          <Navbar />
        </div>
      </div>
      <div className="px-40 py-5 w-full">
        <div className="flex flex-col gap-y-5 items-center justify-center w-full">
          <h1 className="font-Inter font-[700] text-[28px]">Inicia sesión en Gastify Cloud</h1>
          <div className="flex flex-col w-full items-center gap-y-3">
            <button className="w-1/2 py-2 bg-gris-1 gap-x-2 rounded-xl text-14px">Inicia sesión con Google</button>
            <button className="w-1/2 py-2 bg-gris-1 gap-x-2 rounded-xl text-14px">Iniciar sesión con Apple</button>
          </div>
          <p className="text-secondary-14px">O</p>
        </div>
      </div>
      <div className="px-40 w-full">
        <Form />
      </div>
      <div className="w-full flex items-center justify-center my-4">
        <button className="text-secondary-14px">Forgot your password?</button>
      </div>
    </div>
  );
}
