'use client';
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { PermisosThunk, RolesThunk } from '@/redux/slice/roles/thunks';
import { CustomSelect } from './customSelect';

import { axiosInstance } from '@/config/axios';
import Swal from 'sweetalert2';
import { fetchPermisos } from '@/redux/slice/usuarios/usuarios-permisos';

interface PrintCheckboxProps {
  roles: any[];
  formValues: { rolId: string };
  setRoles: React.Dispatch<React.SetStateAction<any[]>>;
}

const PrintCheckbox: React.FC<PrintCheckboxProps> = ({ roles, formValues, setRoles }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { permisos, status, error } = useSelector((state: RootState) => state.permisos);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(PermisosThunk());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

   // Sincroniza permisos del rol seleccionado y permisos globales
   useEffect(() => {
    const obtenerPermisosYFiltrar = async () => {
      const rolSeleccionado = roles.find((rol) => rol.id === formValues.rolId);

      if (rolSeleccionado) {
        const permisosFiltrados = await obtenerPermisos(rolSeleccionado);
        const permisosDelRol = permisosFiltrados.map((permiso: any) => permiso.id);
        setSelectedPermissions(permisosDelRol);
      } else {
        setSelectedPermissions([]); // Limpia los permisos si no hay rol seleccionado
      }
    };

    obtenerPermisosYFiltrar();
  }, [formValues.rolId, roles]);

  // Filtra los permisos del rol seleccionado en base a los permisos disponibles
  const obtenerPermisos = async (rolSeleccionado: any) => {
    try {
      const response = await dispatch(fetchPermisos());
      const permisosDisponibles = response.payload; // Permisos disponibles desde la API
  
      // Filtra los permisos que coinciden con el rol seleccionado
      const permisosFiltrados = permisosDisponibles
        .filter((rolUser: { rolId: string, permisoId: string, nombre: string }) => {
          // Si el rolId del permiso coincide con el rol seleccionado
          if (rolUser.rolId === rolSeleccionado.id) {
  
            // Filtra los permisos del rol seleccionado que coinciden con los permisos disponibles
            const permisosDelRol = rolSeleccionado.permisos.filter((permiso: { nombre: string }) =>
              permisosDisponibles.some((permisoDisponible: any) => permisoDisponible.nombre === permiso.nombre)
            );
  
            // Retorna los nombres de los permisos filtrados
            return permisosDelRol.map((permiso: { nombre: string }) => permiso.nombre);
          }
  
          return false; // Si no coincide el rol, excluye este permiso
        });
  
      // Retorna los permisos filtrados
      return permisosFiltrados.flat(); // Usa flat() para aplanar el array si es necesario
  
    } catch (error) {
      console.error('Error obteniendo permisos:', error);
      return [];
    }
  };
  

  const handleCheckboxChange = (permisoId: string) => {
    setSelectedPermissions((prevSelected) =>
      prevSelected.includes(permisoId) ? prevSelected.filter((id) => id !== permisoId) : [...prevSelected, permisoId],
    );
  };

  const handleSaveChanges = async () => {
    const rolSeleccionado = roles.find((rol) => rol.id === formValues.rolId);

    try {
      const res = await axiosInstance.put(`/roles/asignar-permiso/${rolSeleccionado.id}`, {
        permisos: selectedPermissions,
      });
    console.log(res)
      dispatch(fetchPermisos());

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `Cambios Guardados`,
        showConfirmButton: false,
        timer: 1000,
      });
    } catch (error) {}
  };
  return (
    <div className="w-full">
      {permisos.length > 0 ? (
        permisos.map((permiso:any) => (
          <div key={permiso.id} className="flex gap-x-2 my-3">
            <input
              type="checkbox"
              id={`permiso-${permiso.id}`}
              checked={selectedPermissions.includes(permiso.id)}
              disabled={!formValues.rolId} // Deshabilita el checkbox si no se selecciona un rol
              onChange={() => handleCheckboxChange(permiso.id)}
            />
            <label htmlFor={`permiso-${permiso.id}`} className="text-16px dark:text-textDark">
              {permiso.nombre}
            </label>
          </div>
        ))
      ) : (
        <p className="text-16px dark:text-textDark">No hay permisos disponibles</p>
      )}

      {status === 'failed' && <p className="text-red-500">{error?.toString()}</p>}

      <button
        className="w-full movile:w-5/12 h-12 dark:text-textDark bg-azul rounded-xl font-Inter font-[500] text-blanco"
        onClick={handleSaveChanges}
        disabled={!formValues.rolId} 
      >
        Guardar Cambios
      </button>
    </div>
  );
}

export default function ConfiguracionUsuarios() {
  const dispatch = useDispatch<AppDispatch>();
  const [formValues, setFormValues] = useState({
    rolId: '',
  });
  const [roles, setRoles] = useState<any[]>([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const role = await dispatch(RolesThunk());
        setRoles((role.payload as { data: any[] }).data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleSelectChange = (value: string) => {
    setFormValues({
      ...formValues,
      rolId: value,
    });
  };

  return (
    <div className="w-full p-4 dark:bg-bgDark">
      <h1 className="text-18px py-6 dark:text-textDark">Configuración de Permisos</h1>

      <div className="w-full flex flex-col gap-y-5">
        <div className="w-full">
          <p className="text-16px dark:text-textDark">Rol</p>
          <div className="relative w-full movile:w-5/12">
            <CustomSelect options={roles} selectedValue={formValues.rolId} onChange={handleSelectChange} />
          </div>
        </div>
        <div className="w-full">
          <PrintCheckbox roles={roles} formValues={formValues} setRoles={setRoles} />
        </div>
      </div>
    </div>
  );
}
