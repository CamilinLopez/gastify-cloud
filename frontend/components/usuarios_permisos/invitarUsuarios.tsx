'use client';
import { TablaGestiosUsuarios } from '@/types/usuarios_permisos';
import React, { useState, useEffect } from 'react';
import { Flechas } from '../svg/svgImages';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { RolesThunk } from '@/redux/slice/roles/thunks';

import { SendInviteThunk, GetsUsersThunk } from '@/redux/slice/usuarios/thunks';

const Form = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { roles, status, error } = useSelector((state: RootState) => state.roles);

  const [formValues, setFormValues] = React.useState({
    email: '',
    rolId: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (event:React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true); // Cambia el estado para mostrar "Enviando..."

    await handleSubmit();
    
    setIsSubmitting(false); // Restablece el estado después de enviar
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(RolesThunk());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async() => {
    // event.preventDefault();

    const send = await dispatch(SendInviteThunk(formValues));

    if (send.payload.message) {
      setMessage(send.payload.message);
    }
  };


  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000); // 3 segundos

      return () => clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta antes de que el tiempo haya pasado
    }
  }, [message]);

  return (
    <div className="w-full">
       {message && <div className="text-center text-cyan-700">{message}</div>}
      <form className="w-full" onSubmit={handleFormSubmit}>
        <div className="w-full flex items-end">
          <div className="w-8/12">
            <p className="text-16px py-2">correo electrónico</p>
            <input
              className="p-4 h-14 bg-gris-1 rounded-xl w-8/12"
              type="email"
              placeholder="arturo369@gmail.com"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="w-6/12">
            <p className="text-16px py-2">Rol</p>
            <div className="relative w-8/12">
              {/* <input className="p-4 h-14 bg-gris-1 rounded-xl w-full" type="text" placeholder="Seleccionar" /> */}
              <select
                className="p-4 h-14 bg-gris-1 rounded-xl w-full  border-gray-300 focus:border-blue-500 outline-none transition duration-300 appearance-none shadow-md"
                name="rolId"
                value={formValues.rolId}
                onChange={handleInputChange}
                required>
                <option value="" disabled>
                  {roles.length > 0 ? 'Seleccionar' : 'Cargando roles...'}
                </option>
                {roles.map((role:any) => (
                  <option key={role.id} value={role.id}>
                    {role.nombre}
                  </option>
                ))}
              </select>

              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex flex-col justify-center">
                <Flechas />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-1/4 h-12 bg-azul rounded-xl font-Inter font-[500] text-blanco"
            disabled={status === 'loading' || isSubmitting}
          >
            {status === 'loading' || isSubmitting ? 'Enviando...' : 'Enviar invitación'}
          </button>
        </div>
        {status === 'failed' && <p className="text-red-500">{error?.toString()}</p>}
      </form>
    </div>
  );
};

export default function InvitarUsuarios() {

  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.getsUsuarios);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(RolesThunk());
        await dispatch(GetsUsersThunk());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const textTable = ['correo electrónico', 'Rol', 'Estado de invitación', 'Acciones'];

  const [currentPage, setCurrentPage] = React.useState<number>(1);
const itemsPerPage = 5; 

  const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full p-4">
      <h1 className="text-18px py-6" id="invitar_usuarios">
        Invitar usuarios
      </h1>

      <div className="flex flex-col gap-y-6">
        <Form />
        <div className="overflow-x-auto border-[1px] rounded-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blanco">
            <tr>
              {textTable.map((item) => (
                <th key={item} className="px-6 py-3 text-left text-xs text-14px">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {status === 'loading' ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-secondary-14px">
                  Cargando datos...
                </td>
              </tr>
            ) : status === 'failed' ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : currentData.length > 0 ? (
              currentData.map((item:any, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 font-Inter font-[400] text-[#121417] text-[14px]">
                    {item.email}
                  </td>
                  <td className="px-6 py-4 text-secondary-14px">{item.rol.nombre}</td>
                  <td className="px-6 py-4 text-secondary-14px">
                    {item.verificado === false ? 'pendiente' : 'aceptado'}
                  </td>
                  <td className="px-6 py-4 text-secondary-14px">
                  <button 
  className={`bg-azul rounded-xl font-Inter font-[500] text-blanco p-2 ${item.verificado ? 'opacity-50 cursor-not-allowed' : ''}`}
  disabled={item.verificado} // Desactiva el botón si ya está verificado
>
  {item.verificado ? 'Invitación Confirmada' : 'Cancelar Invitación'}
</button>

                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-secondary-14px">
                  No hay datos disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>

          <div className="flex justify-between py-4">
          <button
            className="bg-gray-300 px-4 py-2 rounded-lg"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span className="text-gray-700">
            Página {currentPage} de {Math.ceil(data.length / itemsPerPage)}
          </span>
          <button
            className="bg-gray-300 px-4 py-2 rounded-lg"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
          >
            Siguiente
          </button>
        </div>

        </div>
      </div>
    </div>
  );
}
