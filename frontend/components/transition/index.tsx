import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Link from 'next/link';
import { ChevronDown } from '../icons/chevron-down';
import { ChevronRight } from '../icons/chevron-right';
import { SectionAlertas, SectionConfiguracion, SectionCuenta } from './configuracionUser';

export function TransitionMenuMovil({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { filteredRoutes, status } = useSelector((state: RootState) => state.permisosUser);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const closeMovileMenu = () => setIsOpen(false);
  const handleItemClick = (item: string) => {
    if (selectedItem === item) {
      setSelectedItem(null);
    } else {
      setSelectedItem(item);
    }
  };
  return (
    <Transition show={isOpen}>
      <Dialog onClose={closeMovileMenu} className={'relative z-50'}>
        <Transition.Child
          as={Fragment}
          enter="transition-all ease-in-out duration-300"
          enterFrom="opacity-0 backdrop-blur-none"
          enterTo="opacity-100 backdrop-blur-[.5px]"
          leave="transition-all ease-in-out duration-200"
          leaveFrom="opacity-100 backdrop-blur-[.5px]"
          leaveTo="opacity-0 backdrop-blur-none">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transition-all ease-in-out duration-300"
          enterFrom="translate-x-[-100%]"
          enterTo="translate-x-0"
          leave="transition-all ease-in-out duration-200"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-[-100%]">
          <Dialog.Panel
            className={'fixed bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col bg-white pb-6 dark:bg-bgDark'}>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <button
                  onClick={closeMovileMenu}
                  className="p-2 rounded-md border-[1px] dark:border-borderDarck ring-primary">
                  <XMarkIcon className="h-6 dark:text-textDark" />
                </button>
                <h1 className="text-18px py-6 dark:text-textDark">Menu</h1>
                <p></p>
              </div>
              <div className="bg-blanco dark:bg-bgDark p-4 h-full justify-between">
                <div className="flex flex-col gap-y-1">
                  {filteredRoutes.map((item: any) => (
                    <div
                      key={item.name}
                      className={`cursor-pointer flex flex-col w-full justify-center items-center rounded-xl`}
                      onClick={() => handleItemClick(item.name)}>
                      <button className={`text-14px dark:text-textDark py-2 w-full flex gap-2 items-center`}>
                        {item.subMenu && selectedItem === item.name ? <ChevronDown /> : <ChevronRight />}
                        {!item.subMenu ? (
                          <Link onClick={closeMovileMenu} className="text-14px dark:text-textDark" href={item.path}>
                            {item.name}
                          </Link>
                        ) : (
                          item.name
                        )}
                      </button>

                      {selectedItem === item.name &&
                        item.subMenu?.map((subItem: any) => (
                          <Link
                            onClick={closeMovileMenu}
                            key={subItem.name}
                            href={subItem.path}
                            className={`text-14px p-2 pl-4 flex flex-col gap-2 w-full dark:text-textDark dark:bg-bgDark bg-white`}>
                            {subItem.name}
                          </Link>
                        ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

export function TransitionOptionsMovil({
  isOpen1,
  setIsOpen1,
}: {
  isOpen1: boolean;
  setIsOpen1: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [cuenta, setCuenta] = useState<boolean>(true);
  const [alarma, setAlarma] = useState<boolean>(false);
  const [configuracion, setConfiguracion] = useState<boolean>(false);

  const closeOptioneMenu = () => setIsOpen1(false);
  const buttonCuenta = () => setCuenta(!cuenta);
  const buttonAlarma = () => setAlarma(!alarma);
  const buttonConfiguracion = () => setConfiguracion(!configuracion);

  return (
    <Transition show={isOpen1}>
      <Dialog onClose={closeOptioneMenu} className={'relative z-50'}>
        <Transition.Child
          as={Fragment}
          enter="transition-all ease-in-out duration-300"
          enterFrom="opacity-0 backdrop-blur-none"
          enterTo="opacity-100 backdrop-blur-[.5px]"
          leave="transition-all ease-in-out duration-200"
          leaveFrom="opacity-100 backdrop-blur-[.5px]"
          leaveTo="opacity-0 backdrop-blur-none">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transition-all ease-in-out duration-300"
          enterFrom="translate-x-[100%]"
          enterTo="translate-x-0"
          leave="transition-all ease-in-out duration-200"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-[100%]">
          <Dialog.Panel
            className={'fixed bottom-0 left-0 right-0 top-0 flex h-full w-full  flex-col bg-white pb-6 dark:bg-bgDark'}>
            <div className="p-6 h-full overflow-y-auto">
              <div className="flex items-center justify-between">
                <button
                  onClick={closeOptioneMenu}
                  className="p-2 rounded-md border-[1px] dark:border-borderDarck ring-primary">
                  <XMarkIcon className="h-6 dark:text-textDark" />
                </button>
                <h1 className="text-18px py-6 dark:text-textDark">Opciones</h1>
                <p></p>
              </div>

              <div>
                <div>
                  <div className="flex items-center gap-x-2 my-5">
                    {cuenta === false ? <ChevronRight /> : <ChevronDown />}
                    <button onClick={buttonCuenta} className="text-16px dark:text-textDark">
                      Cuenta
                    </button>
                  </div>
                  {cuenta && <SectionCuenta setIsOpen1={setIsOpen1} />}
                </div>

                <div>
                  <div className="flex items-center gap-x-2 my-5">
                    {alarma === false ? <ChevronRight /> : <ChevronDown />}
                    <button onClick={buttonAlarma} className="text-16px dark:text-textDark">
                      Alertas
                    </button>
                  </div>
                  {alarma && <SectionAlertas />}
                </div>

                <div>
                  <div className="flex items-center gap-x-2 my-5">
                    {configuracion === false ? <ChevronRight /> : <ChevronDown />}
                    <button onClick={buttonConfiguracion} className="text-16px dark:text-textDark">
                      Configuracion
                    </button>
                  </div>
                  {configuracion && <SectionConfiguracion setIsOpen1={setIsOpen1} />}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
