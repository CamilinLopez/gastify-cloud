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

  useEffect(() => {
    const rolSeleccionado = roles.find((rol) => rol.id === formValues.rolId);
    if (rolSeleccionado) {
      const permisosDelRol = rolSeleccionado.permisos.map((permiso: any) => permiso.id);
      setSelectedPermissions(permisosDelRol);
    }
  }, [formValues.rolId, roles]);

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

      await setRoles((prevRoles) => prevRoles.map((rol) => (rol.id === res.data.data.id ? res.data.data : rol)));

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
        permisos.map((permiso) => (
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
        disabled={!formValues.rolId} // Deshabilita el botón si no se selecciona un rol
      >
        Guardar Cambios
      </button>
    </div>
  );
};

export default function ConfiguracionUsuarios() {
  const dispatch = useDispatch<AppDispatch>();
  const [formValues, setFormValues] = useState({
    rolId: '',
  });
  const [roles, setRoles] = useState<any[]>([]); // Asegúrate de tipar correctamente el estado
  // const { roles, status, error } = useSelector((state: RootState) => state.roles);

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
