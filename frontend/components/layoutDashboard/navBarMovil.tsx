'use client';

import { useState } from 'react';
import { Menu, User } from '../svg/svgImages';

import { TransitionMenuMovil, TransitionOptionsMovil } from '../transition';

export default function NavBarMovil() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);

  const openMovileMenu = () => setIsOpen(true);
  const openOptionsMenu = () => setIsOpen1(true);

  return (
    <div className="bg-blanco h-16 dark:bg-bgDark">
      <div className="flex h-full justify-between items-center">
        <button onClick={openMovileMenu} className="border-[1px] dark:border-borderDarck p-2 rounded-md">
          <Menu />
        </button>
        <div className="flex gap-x-[16px] items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="15" viewBox="0 0 12 15" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              fill="currentColor"
              d="M6 0.833333H12V5.27777V9.72223H6V14.1667H0V9.72223V5.27777H6V0.833333Z"
              className="dark:text-textDark"
            />
          </svg>
          <h1 className="text-18px dark:text-textDark">Gastify Cloud</h1>
        </div>
        <button onClick={openOptionsMenu} className="border-[1px] dark:border-borderDarck p-2 rounded-md">
          <User />
        </button>
      </div>
      <TransitionMenuMovil isOpen={isOpen} setIsOpen={setIsOpen} />
      <TransitionOptionsMovil isOpen1={isOpen1} setIsOpen1={setIsOpen1} />
    </div>
  );
}
