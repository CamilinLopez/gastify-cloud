'use client';
import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { RolesThunk } from '@/redux/slice/roles/thunks';
import { FilterUsers } from '@/redux/slice/usuarios/thunks';
import { CustomSelect } from './customSelect';
import { axiosInstance } from '@/config/axios';
import Swal from 'sweetalert2';

interface FormProps {
  setDataFilter: React.Dispatch<React.SetStateAction<any[]>>;
}

const Form: React.FC<FormProps> = ({ setDataFilter }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { roles, status, error } = useSelector((state: RootState) => state.roles);

  const [formValues, setFormValues] = useState({
    id: '',
    email: '',
    rolId: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await dispatch(FilterUsers(formValues));
      if (res.payload && res.payload.data) {
        setDataFilter(res.payload.data);
      }
    } catch (error) {
      console.error('Error filtering users:', error);
    }
  };

  const handleSelectChange = (value: string) => {
    setFormValues({
      ...formValues,
      rolId: value,
    });
  };

  return (
    <div className="w-full">
      <form className="w-full flex flex-col gap-y-5" onSubmit={handleSubmit}>
        <div className="w-full flex flex-col gap-y-2">
          <p className="text-16px dark:text-textDark">ID usuario</p>
          <input
            className="p-4 h-14 bg-gris-1 rounded-xl w-5/12 dark:bg-bgDark1 dark:text-textDark"
            placeholder="5879954"
            type="text"
            name="id"
            value={formValues.id}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-full flex flex-col gap-y-2 ">
          <p className="text-16px dark:text-textDark">Correo Electrónico</p>
          <input
            className="p-4 h-14 bg-gris-1 rounded-xl w-5/12 pl-4 pr-24 dark:bg-bgDark1 dark:text-textDark"
            placeholder="carlos569@gmail.com"
            type="text"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="w-full">
          <p className="text-16px py-2 dark:text-textDark">Rol</p>
          <div className="relative w-5/12">
            <CustomSelect options={roles} selectedValue={formValues.rolId} onChange={handleSelectChange} />
          </div>
        </div>

        <button
          type="submit"
          className="w-5/12  h-12 bg-azul dark:text-textDark rounded-xl font-Inter font-[500] text-blanco">
          Buscar
        </button>
      </form>
    </div>
  );
};

export default function GestionUsuarios() {
  const [dataFilter, setDataFilter] = useState<any[]>([]);

  const textTable = ['ID', 'Nombre', 'correo electrónico', 'Rol', 'Acciones'];

  const handleEliminarUsuario = async (idUser: string, email: string) => {
    Swal.fire({
      title: `¿Estás seguro de eliminar al usuario ${email}?`,
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
          await axiosInstance.delete(`/usuario/delete-usuario/${idUser}`);

          // Actualizar la lista de usuarios invitados
          setDataFilter((prevUsers) => prevUsers.filter((user) => user.id !== idUser));

          // Mostrar confirmación de eliminación con el email
          Swal.fire({
            title: '¡Eliminado!',
            text: `El usuario ${email} ha sido eliminada.`,
            icon: 'success',
          });
        } catch (error) {
          // Manejar error en la eliminación
          Swal.fire({
            title: 'Error',
            text: `Hubo un error al cancelar la elimicaciòn para ${email}.`,
            icon: 'error',
          });
        }
      }
    });
  };

  return (
    <div className="w-full p-4 dark:bg-bgDark">
      <h1 className="text-18px py-6 dark:text-textDark" id="gestion_usuarios">
        Gestión de usuarios
      </h1>
      <div className="flex flex-col gap-y-6">
        <Form setDataFilter={setDataFilter} />
        <div className="overflow-x-auto border-[1px] rounded-xl dark:border-borderDarck">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-borderDarck">
            <thead className="bg-blanco dark:bg-bgDark1">
              <tr>
                {textTable.map((item) => (
                  <th key={item} className="px-6 py-3 text-left text-xs text-14px dark:text-textDark">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:divide-borderDarck dark:bg-bgDark1">
              {dataFilter.length > 0 ? (
                dataFilter.map((item: any, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4 text-secondary-14px dark:text-textDark">{item.id}</td>
                    <td className="px-6 py-4 text-secondary-14px dark:text-textDark">{item.email}</td>
                    <td className="px-6 py-4 text-secondary-14px dark:text-textDark">{item.email}</td>
                    <td className="px-6 py-4 text-secondary-14px dark:text-textDark">{item.rol.nombre}</td>
                    <td className="px-6 py-4 text-secondary-14px flex gap-x-3">
                      <button
                        className="bg-azul rounded-xl dark:text-textDark font-Inter font-[500] text-blanco p-2"
                        onClick={() => handleEliminarUsuario(item.id, item.email)} // Función para eliminar
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500 dark:text-textDark">
                    No hay datos disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
