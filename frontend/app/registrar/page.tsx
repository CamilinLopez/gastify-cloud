import Navbar from '@/components/inviteUser/navbar';
import { G_google } from '@/components/svg/svgImages';
import React from 'react';

const Form = () => {
  return (
    <div className="w-full flex flex-col gap-y-10">
      <input className="h-14 w-full border-[1px] rounded-xl pl-4 pr-24" type="email" placeholder="E-mail" />
      <input className="h-14 w-full border-[1px] rounded-xl pl-4 pr-24" type="password" placeholder="contraseña" />
      <input
        className="h-14 w-full border-[1px] rounded-xl pl-4 pr-24"
        type="password"
        placeholder="confirmar Contraseña"
      />
    </div>
  );
};

export default function Register() {
  return (
    <div className="flex flex-col gap-y-10 w-full">
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
            <button className="flex items-center justify-center w-full py-2 bg-gris-1 gap-x-2 rounded-xl">
              <G_google />
              <p className="text-14px">Regístrate con Google</p>
            </button>
          </div>
          <div className="w-full flex justify-center">
            <p className="text-secondary-14px">O</p>
          </div>
          <div className="w-full">
            <Form />
          </div>
        </div>
        <div className="flex w-10/12 justify-end">
          <button className="bg-azul rounded-xl font-Inter font-[500] text-blanco px-4 py-2">Continuar</button>
        </div>
      </div>
    </div>
  );
}
