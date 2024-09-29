import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { UsuarioType } from '../layoutDashboard/dropdown';
import { axiosInstance } from '@/config/axios';
import Cookies from 'js-cookie';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { useTheme } from '@/context/ThemeContext';

export function SectionCuenta({ setIsOpen1 }: { setIsOpen1: React.Dispatch<React.SetStateAction<boolean>> }) {
  const router = useRouter();

  const [usuario, setUsuario] = useState<UsuarioType | null>(null);
  const closeOptioneMenu = () => setIsOpen1(false);

  // Cerrar el dropdown si se hace clic fuera de él
  useEffect(() => {
    const fetchUsuarioData = async () => {
      try {
        const response = await axiosInstance.get('/usuario/get-usuario-data');
        setUsuario(response.data.empresa || response.data.usuario); // Asignar los datos obtenidos del usuario al estado
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    fetchUsuarioData();
  }, []);

  const handleLogout = async () => {
    try {
      // Eliminar el token de las cookies
      Cookies.remove('token');

      // Redirigir a la página de inicio de sesión
      router.push('/signin');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };
  return (
    <div className="">
      <div className="dark:bg-bgDark bg-white">
        <div className="p-4 flex flex-col gap-y-2 items-start ">
          <div className="flex justify-between w-full">
            <p className="text-16px dark:text-textDark">{usuario?.nombre}</p>
            <p className="text-16px dark:text-[#CFCFCF]">{usuario?.rol.nombre}</p>
          </div>
          <hr className="w-full border-t border-gray-300 my-3 dark:border-borderDarck" />
          <Link onClick={closeOptioneMenu} href={'/dashboard/usuario/cuenta'} className="text-16px dark:text-[#CFCFCF]">
            Cuenta
          </Link>
          <p className="text-16px dark:text-[#CFCFCF]">Organización</p>
          <hr className="w-full border-t border-gray-300 my-3 dark:border-borderDarck" />
          <button
            className="bg-azul rounded-md px-3 py-1 font-Inter font-[400] text-blanco dark:text-[#CFCFCF]"
            onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}

export function SectionAlertas() {
  const [response, setResponse] = useState<{
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    result: { Titulo: string; Mensaje: string; Fecha: string }[];
  }>({
    status: 'idle',
    result: [],
  });

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) return undefined;
    const decoded = jwt.decode(token) as JwtPayload | null;
    const empresaId = typeof decoded === 'object' && decoded !== null ? decoded.id : undefined;
    axiosInstance
      .get('/alarmas/getAlarmaCilindros', { params: { empresaId } })
      .then((data) => setResponse({ ...response, result: data.data.data.result, status: 'succeeded' }))
      .catch((error) => setResponse({ ...response, status: 'failed' }));
  }, []);

  const textTable = ['Titulo', 'Mensaje', 'Fecha'];

  return (
    <div>
      <div className={`dark:bg-bgDark bg-white border border-gray-300 rounded-md shadow-lg`}>
        {response.result.length ? (
          <div className="overflow-x-auto border-[1px] rounded-xl">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blanco dark:bg-bgDark">
                <tr className="[&>*]:text-center [&>*]:py-2">
                  {textTable.map((item) => (
                    <th key={item} className="px-3 py-3 text-left font-Inter text-[10px] dark:text-[#CFCFCF]">
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-bgDark divide-y divide-gray-200">
                {response.result.map((item, i) => (
                  <tr key={i} className="[&>*]:py-3 [&>*]:font-medium [&>*]:text-center ">
                    <td className="px-6 py-4 font-Inter text-[10px] dark:text-[#CFCFCF] ">{item.Titulo}</td>
                    <td className="px-6 py-4 font-Inter text-[10px] dark:text-[#CFCFCF] ">{item.Mensaje}</td>
                    <td className="px-6 py-4 font-Inter text-[10px] dark:text-[#CFCFCF] ">{item.Fecha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="w-full flex items-center justify-center font-Inter text-[14px] text-blanco dark:text-textDark">
            Sin Alertas
          </div>
        )}
      </div>
    </div>
  );
}

export const SectionConfiguracion = ({ setIsOpen1 }: { setIsOpen1: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { theme, setTheme } = useTheme();

  const closeOptioneMenu = () => setIsOpen1(false);
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as 'system' | 'light' | 'dark';

    setTheme(value);
  };

  return (
    <div>
      <div className="dark:bg-bgDark bg-white">
        <div className="p-0 movile:p-4">
          <p className="text-16px dark:text-[#CFCFCF]">Modo visual</p>
          <div className="mt-4 flex flex-col gap-y-1">
            <div className="flex gap-x-3 items-center">
              <input type="radio" name="theme" value="system" checked={theme === 'system'} onChange={handleOnChange} />
              <p className="text-16px dark:text-[#CFCFCF]">Predeterminado del navegador</p>
            </div>
            <div className="flex gap-x-3 items-center">
              <input type="radio" name="theme" value="light" checked={theme === 'light'} onChange={handleOnChange} />
              <p className="text-16px dark:text-[#CFCFCF]">Claro</p>
            </div>
            <div className="flex gap-x-3 items-center">
              <input type="radio" name="theme" value="dark" checked={theme === 'dark'} onChange={handleOnChange} />
              <p className="text-16px dark:text-[#CFCFCF]">Oscuro</p>
            </div>
          </div>
          <hr className="w-full border-t border-gray-300 my-3" />
          <div>
            <Link
              onClick={closeOptioneMenu}
              href={'/dashboard/configuracion'}
              className="text-16px dark:text-[#CFCFCF]">
              Más ajustes de la configuración de usuario
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
