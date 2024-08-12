'use client';

import { CargaDatos } from '@/types/operaciones';
import React, { ChangeEvent, useState } from 'react';
import { Flechas } from '../svg/svgImages';
import { tablaConductores } from '@/types/inventario_bodegas';
import { DatosCamiones } from '@/types/inventario_camiones';

interface TypeAutocompletableconductores {
  name: 'numero_movil' | 'nombre_conductor';
  form: CargaDatos;
  setForm: React.Dispatch<React.SetStateAction<CargaDatos>>;
  placeholder: string;
  conductores: tablaConductores[];
}

interface TypeAutocompletablecamiones {
  name: 'numero_movil' | 'nombre_conductor';
  form: CargaDatos;
  setForm: React.Dispatch<React.SetStateAction<CargaDatos>>;
  placeholder: string;
  camiones: DatosCamiones[];
}

export const AutocompletableConductores = ({
  conductores,
  name,
  form,
  setForm,
  placeholder,
}: TypeAutocompletableconductores) => {
  //estados
  const [suggestions, setSuggestions] = useState<tablaConductores[]>([]);

  //funciones
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setForm({
      ...form,
      [e.target.name]: { nombre: e.target.value },
    });

    if (value) {
      const dataFilter = conductores.filter((name) =>
        name.nombre.toLocaleLowerCase().includes(value.toLocaleLowerCase()),
      );
      setSuggestions(dataFilter);
    } else {
      setSuggestions([]);
    }
  };

  const handleOptionClick = (name: string, id: string) => {
    setForm({ ...form, nombre_conductor: { id: id, nombre: name } });
    setSuggestions([]);
  };

  return (
    <div className="relative w-5/12">
      <input
        name={name}
        value={form.nombre_conductor.nombre}
        onChange={handleOnChange}
        className="p-4 h-14 bg-gris-1 rounded-xl w-full"
        type="text"
        placeholder={placeholder}
      />
      <div className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 flex flex-col justify-center">
        <Flechas />
      </div>
      {suggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          {suggestions.map((option) => (
            <div
              key={option.id}
              className="p-2 hover:bg-gray-100 cursor-pointer flex gap-x-3"
              onClick={() => handleOptionClick(option.nombre, option.id)}>
              <p className="w-1/2 flex items-start">{option.nombre}</p>
              <p className="text-secondary-14px">{option.licencia}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const AutocompletableCamiones = ({
  camiones,
  name,
  form,
  setForm,
  placeholder,
}: TypeAutocompletablecamiones) => {
  //estados
  const [suggestions, setSuggestions] = useState<DatosCamiones[]>([]);

  //funciones
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setForm({
      ...form,
      [e.target.name]: { placa: e.target.value },
    });

    if (value) {
      const dataFilter = camiones.filter((name) => name.placa.toLocaleLowerCase().includes(value.toLocaleLowerCase()));
      setSuggestions(dataFilter);
    } else {
      setSuggestions([]);
    }
  };

  const handleOptionClick = (placa: string, id: string) => {
    setForm({ ...form, numero_movil: { id, placa: placa } });
    setSuggestions([]);
  };

  return (
    <div className="relative w-5/12">
      <input
        name={name}
        value={form.numero_movil.placa}
        onChange={handleOnChange}
        className="p-4 h-14 bg-gris-1 rounded-xl w-full"
        type="text"
        placeholder={placeholder}
      />
      <div className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 flex flex-col justify-center">
        <Flechas />
      </div>
      {suggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          {suggestions.map((option) => (
            <div
              key={option.id}
              className="p-2 hover:bg-gray-100 cursor-pointer flex gap-x-3"
              onClick={() => handleOptionClick(option.placa, option.id)}>
              <p className="w-1/2 flex items-start">{option.marca}</p>
              <p className="text-secondary-14px">{option.placa}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
