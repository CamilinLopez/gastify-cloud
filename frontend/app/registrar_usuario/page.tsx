import Navbar from '@/components/inviteUser/navbar';
import React from 'react';

function Form() {
  return (
    <form className="flex flex-col space-y-7" action="">
      <input type="text" className="h-14  border-[1px] rounded-xl pl-4 pr-24" placeholder="Nombre" />
      <input type="email" className="h-14  border-[1px] rounded-xl pl-4 pr-24" placeholder="Correo" />
      <input type="password" className="h-14  border-[1px] rounded-xl pl-4 pr-24" placeholder="Contraseña" />
      <input type="password" className="h-14  border-[1px] rounded-xl pl-4 pr-24" placeholder="Confirmar contraseña" />
      <button type="submit" className="bg-azul rounded-xl font-Inter font-[500] text-blanco px-4 py-2">
        Continuar
      </button>
    </form>
  );
}

export default function Registrar_usuario() {
  return (
    <div className="flex flex-col space-y-5 px-3 movile:px-10">
      <div className="border-b-[1px]">
        <Navbar />
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-col space-y-5">
          <div className="flex flex-col items-start space-y-2">
            <h1 className="text-24px">Usuario administrador</h1>
            <p className="font-Inter font-[400] text-[16px]">Crea una cuenta como administrador de "nombre empresa"</p>
          </div>
          <Form />
        </div>
      </div>
    </div>
  );
}
