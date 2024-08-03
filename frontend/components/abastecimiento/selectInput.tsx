import { ChangeEvent, FocusEvent, useState } from 'react';
import { Flechas } from '../svg/svgImages';
import { SelectInputType } from '@/types/abastecimieneto';

const SelectInput = ({ name, formAbastecimiento, setFormAbastecimiento, arrayCilindros }: SelectInputType) => {
  //estados
  const [isOpen, setIsOpen] = useState(false);
  const [hasError, setHasError] = useState(false);
  //funciones
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormAbastecimiento({
      ...formAbastecimiento,
      [e.target.name]: { tipo: e.target.value },
    });

    if (e.target.value) {
      setHasError(false);
    }
  };
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (name: string, { id, tipo }: { id: number | string; tipo: string }) => {
    setFormAbastecimiento({
      ...formAbastecimiento,
      [name]: { id, tipo },
    });
    setIsOpen(false);
    setHasError(false);
  };
  const getName = (name: string) => {
    if (name === 'estadoCilindro') return formAbastecimiento[name].tipo;
    if (name === 'tipoCilindro') return formAbastecimiento[name].tipo;
    if (name === 'modificar') return formAbastecimiento[name]?.tipo;
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (!formAbastecimiento[name]?.tipo) {
      setHasError(true);
    }
  };
  return (
    <>
      <div className="relative w-10/12">
        <input
          name={name}
          value={getName(name)}
          onChange={handleOnChange}
          onBlur={handleBlur}
          className={`p-4 h-14 rounded-xl w-full border ${hasError ? 'border-red-500' : 'bg-gris-1'}`}
          type="text"
          placeholder="Seleccionar"
        />
        <div
          onClick={toggleDropdown}
          className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 flex flex-col justify-center">
          <Flechas />
        </div>
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
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
      {hasError && <p className="text-red-500 text-xs">*falta Agregar Datos*</p>}
    </>
  );
};

export default SelectInput;
