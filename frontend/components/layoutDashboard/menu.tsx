'use client';

import React, { useState, useRef, useEffect } from 'react';
import { RoutesMenu } from '@/arraysObjects/menu';
import { ChevronDown } from '../icons/chevron-down';
import Link from 'next/link';
import { ChevronRight } from '../icons/chevron-right';
import { axiosInstance } from '@/config/axios';


export default function Menu() {
  
  const [userPermissions, setUserPermissions] = useState<string[]>([]);
  const [filteredMenu, setFilteredMenu] = useState(RoutesMenu);

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const menuRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const res = await axiosInstance.get(`/roles/roles-permisos`);
        const permisos = res.data.data.rol.permisos.map((p:any) => p.nombre);
        setUserPermissions(permisos);
        const filtered = filterRoutes(RoutesMenu, permisos);
        setFilteredMenu(filtered);
      } catch (error) {
        console.error('Error obteniendo permisos del usuario:', error);
      }
    };

    fetchPermissions();
  }, []);

  const filterRoutes = (routes:any, permisos: string[]): any[] => {
    return routes
      .filter((route:any) => permisos.includes(route.permisos)) // Filtra el menú basado en permisos
      .map((route:any) => ({
        ...route,
        subMenu: route.subMenu ? filterRoutes(route.subMenu, permisos) : undefined // Filtra submenús recursivamente
      }));
  };

  


  const toggleDropdown = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      const menuElement = menuRefs.current[index];
      if (menuElement) {
        const rect = menuElement.getBoundingClientRect();
        setDropdownPosition({ top: rect.bottom, left: rect.left });
      }
      setOpenIndex(index);
    }
  };


  const handleItemClick = (item: string) => {
    if (selectedItem === item) {
      setSelectedItem(null);
    } else {
      setSelectedItem(item);
    }
  };

  return (
    <div>
      <div className="flex relative xl:hidden">
        {filteredMenu.map((item, index) => (
          <div
            key={index}
            ref={(el) => {
              menuRefs.current[index] = el;
            }}
            className="px-5 whitespace-nowrap flex items-center gap-x-2 relative">
            {item.subMenu ? (
              <p className="text-14px">{item.name}</p>
            ) : (
              <Link className="text-14px" href={item.path}>
                {item.name}
              </Link>
            )}
            {item.subMenu && (
              <button onClick={() => toggleDropdown(index)} className="flex items-center">
                <ChevronDown />
              </button>
            )}
            {openIndex === index && item.subMenu && (
              <div
                className="fixed w-48 bg-white shadow-lg z-50 w-auto"
                style={{ top: dropdownPosition.top, left: dropdownPosition.left }}>
                {item.subMenu.map((subItem) => (
                  <div key={subItem.name} className="flex flex-col">
                    <Link href={subItem.path} className="p-2 hover:bg-gray-100">
                      {subItem.name}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="bg-blanco p-4 xl:flex xl:flex-col h-full justify-between hidden">
        <div className="flex flex-col gap-y-1">
          {RoutesMenu.map((item) => (
            <div
              key={item.name}
              className={`cursor-pointer flex flex-col w-full justify-center items-center rounded-xl`}
              onClick={() => handleItemClick(item.name)}>
              <button className={`text-14px py-2 w-full flex gap-2 items-center`}>
                {item.subMenu && selectedItem === item.name ? <ChevronDown /> : <ChevronRight />}
                {!item.subMenu ? (
                  <Link className="text-14px" href={item.path}>
                    {item.name}
                  </Link>
                ) : (
                  item.name
                )}
              </button>

              {selectedItem === item.name &&
                item.subMenu?.map((subItem) => (
                  <Link
                    key={subItem.name}
                    href={subItem.path}
                    className={`text-14px p-2 pl-4 flex flex-col gap-2 w-full bg-white`}>
                    {subItem.name}
                  </Link>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
