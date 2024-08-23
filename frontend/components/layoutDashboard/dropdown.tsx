'use client';

import { SelectOptionType } from '@/types/layoutDashboard';
import { useState } from 'react';
import { FlechaDown } from '../svg/svgImages';

export const SelectOptions = ({ name }: SelectOptionType) => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleDropdown = () => setOpen(!open);

  return (
    <div className="relative">
      <div className="flex items-center gap-x-1">
        <p className="text-14px">{name}</p>
        <button onClick={toggleDropdown}>
          <FlechaDown />
        </button>
      </div>
      {open && (
        <div className="absolute z-10 mt-3 w-48 bg-white border border-gray-300 rounded-md shadow-lg right-0">
          <p>hola</p>
          <p>hola</p>
        </div>
      )}
    </div>
  );
};
