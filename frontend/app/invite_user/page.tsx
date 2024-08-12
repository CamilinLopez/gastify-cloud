'use client'
import Navbar from '@/components/inviteUser/navbar';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function InviteUser() {
  const router = useRouter();
  const [usuario, setUsuario] = useState('');

  
useEffect(() => {
    if (typeof window !== 'undefined') {

      const searchParams = new URLSearchParams(window.location.search);
        const email = searchParams.get('email');

        if (email) {
          // Intentar obtener el usuario del almacenamiento local
          const storedUsuario = localStorage.getItem('usuario');

          if (storedUsuario && storedUsuario == email) {
            setUsuario(storedUsuario);
          } else{
            setUsuario(email);
            localStorage.setItem('usuario', email); // Guardar en localStorage
          }

          // Remover el parámetro email de la URL
          // searchParams.delete('email');
          // const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
          // router.replace(newUrl);
        } else {
          const storedUsuario = localStorage.getItem('usuario');
          setUsuario(storedUsuario ?? 'acepte de nuevo la invitación');
        }
    }
  }, [router]);





  return (
    <div className="flex flex-col gap-y-10">
      <div className="border-b-[1px]">
        <div className="px-10">
          <Navbar />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-start gap-y-6">
          <div className="flex flex-col gap-y-4">
            <h1 className="text-24px">Inscríbase a un nuevo usuario</h1>
            <p className="text-16px">Escriba la información de usuario</p>
          </div>

          <div className="flex flex-col gap-y-5">
            <p className="text-secondary-14px">Nombre de usuario: {usuario}</p>
            <form className="flex flex-col gap-y-6" action="">
              <div className="flex flex-col">
                <p className="text-16px">Contraseña</p>
                <input className="p-4 h-14 bg-gris-1 rounded-xl w-full" type="password" />
              </div>
              <div className="flex flex-col gap-y-2">
                <p className="text-16px">Confirmar contraseña</p>
                <input className="p-4 h-14 bg-gris-1 rounded-xl w-full" type="password" />
                <div className="flex gap-x-3 items-center">
                  <input className="w-4 h-4" type="checkbox" />
                  <p className="font-Inter font-[400] text-[16px]">Mostrar contraseña</p>
                </div>
              </div>
              <button className="w-full h-12 bg-azul rounded-xl font-Inter font-[500] text-blanco">
                Establecer nueva contraseña
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
