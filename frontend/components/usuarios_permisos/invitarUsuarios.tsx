'use client';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { RolesThunk } from '@/redux/slice/roles/thunks';

import { SendInviteThunk, GetsUsersThunk } from '@/redux/slice/usuarios/thunks';

import { axiosInstance } from '@/config/axios';
import { CustomSelect } from './customSelect';
import Swal from 'sweetalert2';

interface FormProps {
  setUsersInvited: React.Dispatch<React.SetStateAction<any[]>>;
}
const Form: React.FC<FormProps> = ({ setUsersInvited }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { roles, status, error } = useSelector((state: RootState) => state.roles);

  const [formValues, setFormValues] = React.useState({
    email: '',
    rolId: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [buttonText, setButtonText] = useState('Enviar invitación');

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

  const handleSubmit = async () => {
    // event.preventDefault();

    const send = await dispatch(SendInviteThunk(formValues));
    if (send.payload.errors && Array.isArray(send.payload.errors)) {
      send.payload.errors.forEach((error:any) => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: error.msg, 
          showConfirmButton: false,
          timer: 3000,
        });
      });
      return;
    }
   
    await setUsersInvited((prevUsers) => [...prevUsers, send.payload.usuario]);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `${send.payload.message}`,
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true); // Cambia el estado para mostrar "Enviando..."
    setButtonText('Enviando...');

    await handleSubmit();

    setFormValues({ email: '', rolId: '' });

    setIsSubmitting(false); // Restablece el estado después de enviar

    // Espera 3 segundos antes de volver a mostrar "Enviar invitación"
    setTimeout(() => {
      setButtonText('Enviar invitación');
    }, 3000);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSelectChange = (value: string) => {
    setFormValues({
      ...formValues,
      rolId: value,
    });
  };

  return (
    <div className="w-full">
      <form className="w-full" onSubmit={handleFormSubmit}>
        <div className="w-full flex flex-col movile:flex-row items-end justify-start">
          <div className="w-full movile:w-8/12">
            <p className="text-16px py-2 dark:text-textDark">correo electrónico</p>
            <input
              className="p-4 h-14 bg-gris-1 dark:text-textDark dark:bg-bgDark1 rounded-xl w-full movile:w-8/12 "
              type="email"
              placeholder="arturo369@gmail.com"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="w-full movile:w-6/12">
            <p className="text-16px py-2 dark:text-textDark">Rol</p>
            <CustomSelect options={roles} selectedValue={formValues.rolId} onChange={handleSelectChange} />
          </div>
          <button
            type="submit"
            className="ml-5 my-3 movile:my-0 w-full sm:w-1/4 h-12 bg-azul dark:text-textDark rounded-xl font-Inter font-[500] text-blanco"
            disabled={status === 'loading' || isSubmitting}>
            {status === 'loading' || isSubmitting ? 'Enviando...' : 'Enviar invitación'}
          </button>
        </div>
        {status === 'failed' && <p className="text-red-500">{error?.toString()}</p>}
      </form>
    </div>
  );
};

export default function InvitarUsuarios() {
  const [usersInvited, setUsersInvited] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.getsUsuarios);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(RolesThunk());
        const usersInvited = await dispatch(GetsUsersThunk());
        setUsersInvited(usersInvited.payload.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const textTable = ['correo electrónico', 'Rol', 'Estado de invitación', 'Acciones'];

  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = usersInvited.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEliminarInvitacion = async (idInvitacion: string, email: string) => {
    Swal.fire({
      title: `¿Estás seguro de eliminar la invitación para ${email}?`,
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Llamada a la API para eliminar la invitación
          await axiosInstance.delete(`/empresa/post-empresa-cancelar-invitacion/${idInvitacion}`);

          // Actualizar la lista de usuarios invitados
          setUsersInvited((prevUsers) => prevUsers.filter((user) => user.id !== idInvitacion));

          // Mostrar confirmación de eliminación con el email
          Swal.fire({
            title: '¡Eliminado!',
            text: `La invitación para ${email} ha sido eliminada.`,
            icon: 'success',
          });
        } catch (error) {
          // Manejar error en la eliminación
          Swal.fire({
            title: 'Error',
            text: `Hubo un error al cancelar la invitación para ${email}.`,
            icon: 'error',
          });
        }
      }
    });
  };

  return (
    <div className="w-full p-4  dark:bg-bgDark">
      <h1 className="text-18px py-2 movile:py-6 dark:text-textDark" id="invitar_usuarios">
        Invitar usuarios
      </h1>

      <div className="flex flex-col gap-y-6">
        <Form setUsersInvited={setUsersInvited} />
        <div className="overflow-x-auto border-[1px] rounded-xl dark:border-borderDarck">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-borderDarck">
            <thead className="bg-blanco dark:bg-bgDark1">
              <tr>
                {textTable.map((item) => (
                  <th key={item} className="px-6 py-3 text-left text-xs text-13px dark:text-textDark">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:divide-borderDarck dark:bg-bgDark1">
              {status === 'loading' ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-secondary-14px dark:text-textDark">
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
                currentData.map((item: any, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4 font-Inter font-[400] text-[#121417] text-[14px] dark:text-textDark">
                      {item.email}
                    </td>
                    <td className="px-6 py-4 text-secondary-14px dark:text-textDark">{item.rol.nombre}</td>
                    <td className="px-6 py-4 text-secondary-14px dark:text-textDark">
                      {item.verificado === false ? 'pendiente' : 'aceptado'}
                    </td>
                    <td className="px-6 py-4 text-secondary-14px">
                      <button
                        className={`bg-azul dark:text-textDark rounded-xl font-Inter font-[500] text-blanco p-2 ${item.verificado ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={item.verificado} // Desactiva el botón si ya está verificado
                        onClick={() => handleEliminarInvitacion(item.id, item.email)} // Función para eliminar
                      >
                        {item.verificado ? 'Invitación Confirmada' : 'Cancelar Invitación'}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-secondary-14px dark:text-textDark">
                    No hay datos disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex justify-between items-center py-4 px-1">
            <button
              className="bg-gray-300 px-2 py-1 movile:px-4 movile:py-2 text-13px  rounded-lg dark:bg-azul dark:text-textDark"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}>
              Anterior
            </button>
            <span className="text-gray-700 movile:text-14px text-14px  dark:text-textDark">
              Página {currentPage} de {Math.ceil(usersInvited.length / itemsPerPage)}
            </span>
            <button
              className="bg-gray-300 px-2 py-1 movile:px-4 movile:py-2 text-13px text-13px rounded-lg dark:bg-azul dark:text-textDark"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === Math.ceil(usersInvited.length / itemsPerPage)}>
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
