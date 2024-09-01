import { useState } from "react";
import { Flechas } from "../svg/svgImages";

export const CustomSelect: React.FC<{
  options: { id: string; nombre: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
}> = ({ options, selectedValue, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: { id: string; nombre: string }) => {
    onChange(option.id);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div
        className="p-4 h-14 bg-gris-1 rounded-xl w-full border-gray-300 focus:border-blue-500 outline-none transition duration-300 shadow-md cursor-pointer flex items-center justify-between"
        onClick={toggleDropdown}
      >
        <span>
          {options.find(option => option.id === selectedValue)?.nombre || 'Seleccionar'}
        </span>
        <Flechas />
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.length === 0 ? (
            <div className="p-2 text-gray-500">Cargando opciones...</div>
          ) : (
            options.map(option => (
              <div
                key={option.id}
                className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                onClick={() => handleOptionClick(option)}
              >
                <span className="flex-grow">{option.nombre}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
