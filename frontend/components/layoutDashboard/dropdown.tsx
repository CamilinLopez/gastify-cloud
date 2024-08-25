'use client';

import { SelectOptionType } from '@/types/layoutDashboard';
import { useState, useEffect, useRef } from 'react';
import { FlechaDown } from '../svg/svgImages';

export const Usuarios = ({ name }: SelectOptionType) => {
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setOpen(!open);

  // Cerrar el dropdown si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center gap-x-1">
        <p className="text-14px">{name}</p>
        <button onClick={toggleDropdown}>
          <FlechaDown />
        </button>
      </div>
      {open && (
        <div className="absolute z-10 mt-3 w-48 bg-white border border-gray-300 rounded-md shadow-lg right-0">
          <div className="p-4 flex flex-col gap-y-2 items-start">
            <p className="text-16px">Administrador</p>
            <hr className="w-full border-t border-gray-300 my-3" />
            <p className="text-14px">Cuenta</p>
            <p className="text-14px">Organización</p>
            <hr className="w-full border-t border-gray-300 my-3" />
            <button className="bg-azul rounded-md px-3 font-Inter font-[400] text-blanco">Cerrar sesión</button>
          </div>
        </div>
      )}
    </div>
  );
};

export const Alertas = ({ name }: SelectOptionType) => {
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setOpen(!open);

  // Cerrar el dropdown si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const textTable = ['Titulo', 'Mensaje', 'Fecha'];
  const alertas = [
    {
      Titulo: 'Bajo Stock 5kg',
      Mensaje: '50 uninades',
      fecha: '2024/22/07',
    },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center gap-x-1">
        <p className="text-14px">{name}</p>
        <button onClick={toggleDropdown}>
          <FlechaDown />
        </button>
      </div>

      {open && (
        <div className="absolute z-10 mt-3 w-96 bg-white border border-gray-300 rounded-md shadow-lg right-0">
          <div className="overflow-x-auto border-[1px] rounded-xl">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blanco">
                <tr className="[&>*]:text-center [&>*]:py-2">
                  {textTable.map((item) => (
                    <th key={item} className="px-3 py-3 text-left font-Inter text-[10px]">
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {alertas.map((item, i) => (
                  <tr key={i} className="[&>*]:py-3 [&>*]:font-medium [&>*]:text-center ">
                    <td className="px-6 py-4 font-Inter text-[10px]">{item.Titulo}</td>
                    <td className="px-6 py-4 font-Inter text-[10px]">{item.Mensaje}</td>
                    <td className="px-6 py-4 font-Inter text-[10px]">{item.fecha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export const Configuracion = () => {
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setOpen(!open);

  // Cerrar el dropdown si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="bg-gris-1 p-[10px] rounded-[12px]">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9 4.75C6.92893 4.75 5.25 6.42893 5.25 8.5C5.25 10.5711 6.92893 12.25 9 12.25C11.0711 12.25 12.75 10.5711 12.75 8.5C12.7478 6.42982 11.0702 4.75215 9 4.75ZM9 11C7.61929 11 6.5 9.88071 6.5 8.5C6.5 7.11929 7.61929 6 9 6C10.3807 6 11.5 7.11929 11.5 8.5C11.5 9.88071 10.3807 11 9 11ZM15.875 8.66875C15.8781 8.55625 15.8781 8.44375 15.875 8.33125L17.0406 6.875C17.1646 6.71994 17.2075 6.51522 17.1562 6.32344C16.9652 5.60516 16.6793 4.91551 16.3062 4.27266C16.2072 4.10208 16.0334 3.98827 15.8375 3.96562L13.9844 3.75938C13.9073 3.67812 13.8292 3.6 13.75 3.525L13.5312 1.66719C13.5084 1.47109 13.3943 1.2973 13.2234 1.19844C12.5803 0.826052 11.8907 0.540496 11.1727 0.349219C10.9807 0.298197 10.776 0.341406 10.6211 0.465625L9.16875 1.625C9.05625 1.625 8.94375 1.625 8.83125 1.625L7.375 0.461719C7.21994 0.337772 7.01522 0.294856 6.82344 0.346094C6.10527 0.537521 5.41567 0.823346 4.77266 1.19609C4.60208 1.29514 4.48827 1.4689 4.46562 1.66484L4.25938 3.52109C4.17812 3.5987 4.1 3.67682 4.025 3.75547L2.16719 3.96875C1.97109 3.99156 1.7973 4.10569 1.69844 4.27656C1.32605 4.91966 1.0405 5.60925 0.849219 6.32734C0.798197 6.51925 0.841406 6.72398 0.965625 6.87891L2.125 8.33125C2.125 8.44375 2.125 8.55625 2.125 8.66875L0.961719 10.125C0.837772 10.2801 0.794856 10.4848 0.846094 10.6766C1.03718 11.3948 1.32302 12.0845 1.69609 12.7273C1.79514 12.8979 1.9689 13.0117 2.16484 13.0344L4.01797 13.2406C4.09557 13.3219 4.1737 13.4 4.25234 13.475L4.46875 15.3328C4.49156 15.5289 4.60569 15.7027 4.77656 15.8016C5.41966 16.1739 6.10925 16.4595 6.82734 16.6508C7.01925 16.7018 7.22398 16.6586 7.37891 16.5344L8.83125 15.375C8.94375 15.3781 9.05625 15.3781 9.16875 15.375L10.625 16.5406C10.7801 16.6646 10.9848 16.7075 11.1766 16.6562C11.8948 16.4652 12.5845 16.1793 13.2273 15.8062C13.3979 15.7072 13.5117 15.5334 13.5344 15.3375L13.7406 13.4844C13.8219 13.4073 13.9 13.3292 13.975 13.25L15.8328 13.0312C16.0289 13.0084 16.2027 12.8943 16.3016 12.7234C16.6739 12.0803 16.9595 11.3907 17.1508 10.6727C17.2018 10.4807 17.1586 10.276 17.0344 10.1211L15.875 8.66875ZM14.6172 8.16094C14.6305 8.38678 14.6305 8.61322 14.6172 8.83906C14.6079 8.99369 14.6563 9.14626 14.7531 9.26719L15.8617 10.6523C15.7345 11.0566 15.5716 11.4488 15.375 11.8242L13.6094 12.0242C13.4556 12.0413 13.3136 12.1148 13.2109 12.2305C13.0606 12.3996 12.9004 12.5598 12.7312 12.7102C12.6156 12.8129 12.5421 12.9548 12.525 13.1086L12.3289 14.8727C11.9535 15.0694 11.5613 15.2323 11.157 15.3594L9.77109 14.2508C9.66019 14.1622 9.52242 14.114 9.38047 14.1141H9.34297C9.11712 14.1273 8.89069 14.1273 8.66484 14.1141C8.51022 14.1048 8.35765 14.1532 8.23672 14.25L6.84766 15.3594C6.44339 15.2322 6.05122 15.0693 5.67578 14.8727L5.47578 13.1094C5.45871 12.9556 5.38522 12.8136 5.26953 12.7109C5.1004 12.5606 4.94023 12.4004 4.78984 12.2312C4.68713 12.1156 4.54517 12.0421 4.39141 12.025L2.62734 11.8281C2.43062 11.4527 2.26774 11.0606 2.14062 10.6562L3.24922 9.27031C3.34602 9.14938 3.39446 8.99681 3.38516 8.84219C3.37188 8.61634 3.37188 8.38991 3.38516 8.16406C3.39446 8.00944 3.34602 7.85687 3.24922 7.73594L2.14062 6.34766C2.26783 5.94339 2.43071 5.55122 2.62734 5.17578L4.39062 4.97578C4.54439 4.95871 4.68635 4.88522 4.78906 4.76953C4.93945 4.6004 5.09962 4.44023 5.26875 4.28984C5.3849 4.18707 5.45869 4.04478 5.47578 3.89062L5.67188 2.12734C6.04727 1.93062 6.43944 1.76774 6.84375 1.64062L8.22969 2.74922C8.35062 2.84602 8.50319 2.89446 8.65781 2.88516C8.88366 2.87188 9.11009 2.87188 9.33594 2.88516C9.49056 2.89446 9.64313 2.84602 9.76406 2.74922L11.1523 1.64062C11.5566 1.76783 11.9488 1.93071 12.3242 2.12734L12.5242 3.89062C12.5413 4.04439 12.6148 4.18635 12.7305 4.28906C12.8996 4.43945 13.0598 4.59962 13.2102 4.76875C13.3129 4.88444 13.4548 4.95793 13.6086 4.975L15.3727 5.17109C15.5694 5.54649 15.7323 5.93866 15.8594 6.34297L14.7508 7.72891C14.653 7.85086 14.6045 8.005 14.6148 8.16094H14.6172Z"
            fill="#121417"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute z-10 mt-3 w-80 bg-white border border-gray-300 rounded-md shadow-lg right-0">
          <div className="p-4">
            <p className="text-16px">Modo visual</p>
            <div className="mt-4 flex flex-col gap-y-1">
              <div className="flex gap-x-3 items-center">
                <input type="checkbox" />
                <p className="text-14px">Predeterminado del navegador</p>
              </div>
              <div className="flex gap-x-3 items-center">
                <input type="checkbox" />
                <p className="text-14px">Claro</p>
              </div>
              <div className="flex gap-x-3 items-center">
                <input type="checkbox" />
                <p className="text-14px">Oscuro</p>
              </div>
            </div>
            <hr className="w-full border-t border-gray-300 my-3" />
            <div>
              <p className="text-14px">Más ajustes de la configuración de usuario</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
