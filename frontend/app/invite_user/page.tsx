'use client'
import Navbar from '@/components/inviteUser/navbar';
import React, { useEffect, useState } from 'react';


import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store';
import { UserSetPasswordThunk } from '@/redux/slice/usuarios/thunks';
import { AppDispatch } from "@/redux/store";



export default function InviteUser() {
  
  const [formValues, setFormValues] = useState({
    password: '',
    confirmPassword: '',
    email:'',
    empresa:''
  });
  const [showPassword, setShowPassword] = useState(false);

  const [usuario, setUsuario] = useState('');
  const dispatch: AppDispatch = useDispatch();

  useSelector((state: RootState) => state.setPassword);
  
useEffect(() => {
    if (typeof window !== 'undefined') {

      const searchParams = new URLSearchParams(window.location.search);
        const email = searchParams.get('email');
        const empresa = searchParams.get('empresa');
        
        if (email && empresa) {
          // Intentar obtener el usuario del almacenamiento local
          const storedUsuario = localStorage.getItem('usuario');

          setFormValues({...formValues, email: email, empresa: empresa})

          if (storedUsuario && storedUsuario == email) {
            setUsuario(storedUsuario);
          } else {
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
  }, []);

  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleFormSubmit = async(event: React.FormEvent) => {
    event.preventDefault();
    if (formValues.password === formValues.confirmPassword) {

      const setPassword = await dispatch(UserSetPasswordThunk({ email:formValues.email, password:formValues.password, empresa:formValues.empresa }));
    if (setPassword.payload.dashboard) {
      window.location.href =setPassword.payload.dashboard
    }
      // Aquí puedes hacer el submit, enviar los datos al servidor, etc.
    } else {
      alert('Las contraseñas no coinciden');
    }
  };




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
            <form className="flex flex-col gap-y-6" onSubmit={handleFormSubmit}>
              <div className="flex flex-col">
                <p className="text-16px">Contraseña</p>
                <input
                  className="p-4 h-14 bg-gris-1 rounded-xl w-full"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formValues.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <p className="text-16px">Confirmar contraseña</p>
                <input
                  className="p-4 h-14 bg-gris-1 rounded-xl w-full"
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formValues.confirmPassword}
                  onChange={handleInputChange}
                />
                <div className="flex gap-x-3 items-center">
                  <input
                    className="w-4 h-4"
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  />
                  <p className="font-Inter font-[400] text-[16px]">Mostrar contraseña</p>
                </div>
              </div>
              <button
                type="submit"
                className="w-full h-12 bg-azul rounded-xl font-Inter font-[500] text-blanco"
              >
                Establecer nueva contraseña
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
