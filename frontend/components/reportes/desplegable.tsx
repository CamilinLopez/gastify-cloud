'use client';

import { tablaConductores } from '@/types/inventario_bodegas';
import { ChangeEvent, useState } from 'react';
import { Flechas } from '../svg/svgImages';
import { BuscarReportesForm } from '@/types/reportes';

interface TypeAutocompletableconductores {
  name: 'conductor';
  form: BuscarReportesForm;
  setForm: React.Dispatch<React.SetStateAction<BuscarReportesForm>>;
  placeholder: string;
  conductores: tablaConductores[];
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
    setForm({ ...form, conductor: { id: id, nombre: name } });
    setSuggestions([]);
  };

  return (
    <div className="relative w-5/12">
      <input
        name={name}
        value={form.conductor.nombre}
        onChange={handleOnChange}
        className="p-4 h-14 dark:text-textDark dark:bg-bgDark1 bg-gris-1 rounded-xl w-full"
        type="text"
        placeholder={placeholder}
      />
      <div className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 flex flex-col justify-center">
        <Flechas />
      </div>
      {suggestions.length > 0 && (
        <div className="absolute dark:bg-bgDark1 z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          {suggestions.map((option) => (
            <div
              key={option.id}
              className="p-2 hover:bg-gray-100 cursor-pointer flex gap-x-3"
              onClick={() => handleOptionClick(option.nombre, option.id)}>
              <p className="w-1/2 flex items-start dark:text-textDark">{option.nombre}</p>
              <p className="text-secondary-14px dark:text-textDark">{option.licencia}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
