'use client'
import React, { useState, useEffect } from 'react';
import { Flechas } from '../svg/svgImages';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { RolesThunk } from '@/redux/slice/roles/thunks';
import { FilterUsers } from '@/redux/slice/usuarios/thunks';

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

  return (
    <div className="w-full">
      <form className="w-full flex flex-col gap-y-5" onSubmit={handleSubmit}>
        <div className="w-full flex flex-col gap-y-2">
          <p className="text-16px">ID usuario</p>
          <input className="p-4 h-14 bg-gris-1 rounded-xl w-5/12" placeholder="5879954" type="text" name="id"
            value={formValues.id}
            onChange={handleInputChange} />
        </div>
        <div className="w-full flex flex-col gap-y-2">
          <p className="text-16px">Correo Electrónico</p>
          <input
            className="p-4 h-14 bg-gris-1 rounded-xl w-5/12 pl-4 pr-24"
            placeholder="carlos569@gmail.com"
            type="text"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="w-full">
            <p className="text-16px py-2">Rol</p>
            <div className="relative w-5/12">
              {/* <input className="p-4 h-14 bg-gris-1 rounded-xl w-full" type="text" placeholder="Seleccionar" /> */}
              <select
                className="p-4 h-14 bg-gris-1 rounded-xl w-full  border-gray-300 focus:border-blue-500 outline-none transition duration-300 appearance-none shadow-md"
                name="rolId"
                value={formValues.rolId}
                onChange={handleInputChange}
                >
                <option value="">
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
        <button type='submit' className="w-5/12  h-12 bg-azul rounded-xl font-Inter font-[500] text-blanco">Buscar</button>
      </form>
    </div>
  );
};

export default function GestionUsuarios() {
  const [dataFilter, setDataFilter] = useState<any[]>([]);

  const textTable = ['ID', 'Nombre', 'correo electrónico', 'Rol', 'Acciones'];

  const info = [
    {
      ID: '455f5gh22dfg',
      Nombre: 'Antonio moralez cuesta',
      'correo electrónico': 'antonito455@gmail.com',
      Rol: 'Administrador',
      Acciones: ['Eliminar', 'Guardar'],
    },
  ];
  return (
    <div className="w-full p-4">
      <h1 className="text-18px py-6" id="gestion_usuarios">
        Gestión de usuarios
      </h1>
      <div className="flex flex-col gap-y-6">
        <Form setDataFilter={setDataFilter} />
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
              {dataFilter.map((item:any, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 text-secondary-14px ">{item.id}</td>
                  <td className="px-6 py-4 text-secondary-14px ">{item.email}</td>
                  <td className="px-6 py-4 text-secondary-14px ">{item.email}</td>
                  <td className="px-6 py-4 text-secondary-14px ">{item.rol.nombre}</td>
                  <td className="px-6 py-4 text-secondary-14px flex gap-x-3">
                    <button className="bg-azul rounded-xl font-Inter font-[500] text-blanco p-2">
                      Eliminar
                    </button>
                    <button className="bg-azul rounded-xl font-Inter font-[500] text-blanco p-2">
                      Guardar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
