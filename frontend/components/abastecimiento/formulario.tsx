'use client';

import React, { useState, ChangeEvent } from 'react';
import { Flechas } from '../svg/svgImages';
import { AppDispatch } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { FormAbastecimiento, SelectInputType, ErrorsForms } from '@/types/abastecimieneto';
import { estadoCilindros, estadoModificar, tipoCilindros } from '@/arraysObjects/dataCilindros';
import { crearFormulario } from '@/redux/slice/abastecimiento/thunks';
import moment, { now } from 'moment';
import { generateId } from '@/utils/generateId';
import { RootState } from '@/redux/reducer';
import Cookies from 'js-cookie';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { validate } from './validate';

const SelectInput = ({ name, formAbastecimiento, setFormAbastecimiento, arrayCilindros }: SelectInputType) => {
  //estados
  const [isOpen, setIsOpen] = useState(false);

  //funciones
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormAbastecimiento({
      ...formAbastecimiento,
      [e.target.name]: { tipo: e.target.value },
    });
  };
  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleOptionClick = (name: string, { id, tipo }: { id: number | string; tipo: string }) => {
    setFormAbastecimiento({
      ...formAbastecimiento,
      [name]: { id, tipo },
    });
    setIsOpen(false);
  };
  const getName = (name: string) => {
    if (name === 'estadoCilindro') return formAbastecimiento[name].tipo;
    if (name === 'tipoCilindro') return formAbastecimiento[name].tipo;
    if (name === 'modificar') return formAbastecimiento[name]?.tipo;
  };

  return (
    <div className="relative w-full movile:w-10/12">
      <input
        name={name}
        value={getName(name)}
        onChange={handleOnChange}
        className="p-4 h-14 dark:text-textDark dark:bg-bgDark1 bg-gris-1 rounded-xl w-full"
        type="text"
        placeholder="Seleccionar"
      />
      <div
        onClick={toggleDropdown}
        className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 flex flex-col justify-center">
        <Flechas />
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full dark:text-textDark dark:bg-bgDark1 bg-white border border-gray-300 rounded-md shadow-lg">
          {arrayCilindros.map((option) => (
            <div
              key={option.id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleOptionClick(name, option)}>
              {option.tipo}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


