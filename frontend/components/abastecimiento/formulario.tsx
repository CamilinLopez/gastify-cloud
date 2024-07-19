'use client';

import React, { useState, ChangeEvent } from 'react';
import { Flechas } from '../svg/svgImages';
import { updateAll } from '@/redux/slice/abastecimiento/abastecimiento';
import { AppDispatch } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { FormAbastecimiento, SelectInputType } from '@/types/abastecimieneto';
import { estadoCilindros, tipoCilindros } from '@/arraysObjects/dataCilindros';



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

  return (
    <div className="relative w-10/12">
      <input
        name={name}
        value={
          name === 'estadoCilindroId'
            ? formAbastecimiento.estadoCilindroId.tipo
            : formAbastecimiento.tipoCilindroId.tipo
        }
        onChange={handleOnChange}
        className="p-4 h-14 bg-gris-1 rounded-xl w-full"
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
  );
};

export default function Formulario() {
  const dispatch: AppDispatch = useDispatch();

  //estados
  const [formAbastecimiento, setFormAbastecimiento] = useState<FormAbastecimiento>({
    id: '',
    fecha: '',
    hora: '',
    cantidad: 0,
    tipoCilindroId: { id: '', tipo: '' },
    estadoCilindroId: { id: '', tipo: '' },
  });

  //funciones
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormAbastecimiento({
      ...formAbastecimiento,
      [e.target.name]: e.target.value,
    });
  };
  const registrarAbastecimiento = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

  };

  return (
    <div className="p-4 w-full">
      <h1 className="text-18px py-6" id="registro_abastecimiento">
        Registro de abastecimiento
      </h1>
      <div className="w-full">
        <form className="w-full flex flex-col gap-y-5" action="">
          <div className="w-full flex">
            <div className="w-1/2 flex flex-col gap-y-3 ">
              <div className="w-full flex flex-col gap-y-2">
                <p className="text-16px py-2">Estado de cilindro</p>
                <SelectInput
                  name="estadoCilindroId"
                  formAbastecimiento={formAbastecimiento}
                  setFormAbastecimiento={setFormAbastecimiento}
                  arrayCilindros={estadoCilindros}
                />
              </div>
              <div className="w-full flex flex-col gap-y-2">
                <p className="text-16px py-2">Tipo de cilindro</p>
                <SelectInput
                  name="tipoCilindroId"
                  formAbastecimiento={formAbastecimiento}
                  setFormAbastecimiento={setFormAbastecimiento}
                  arrayCilindros={tipoCilindros}
                />
              </div>
            </div>

            <div className="w-1/2  flex flex-col gap-y-3 ">
              <div className="w-full flex flex-col gap-y-2">
                <p className="text-16px py-2">Cantidad recibida</p>
                <input
                  name="cantidad"
                  value={formAbastecimiento.cantidad}
                  onChange={handleOnChange}
                  className="p-4 h-14 bg-gris-1 rounded-xl w-10/12"
                  type="number"
                  placeholder="Ingresar cantidad"
                />
              </div>
              {/* <div className="w-full flex flex-col gap-y-2">
                <p className="text-16px py-2">Proveedor</p>
                <input type="text" className="p-4 h-14 bg-gris-1 rounded-xl w-10/12" placeholder="Ingresar" />
              </div> */}
            </div>
          </div>

          {/* <div className="w-full">
            <p className="text-16px py-2">Observaciones</p>
            <textarea className="w-5/12 h-36 bg-gris-1 rounded-xl" />
          </div> */}

          <button
            onClick={(e) => registrarAbastecimiento(e)}
            className="w-5/12 h-12 bg-azul rounded-xl font-Inter font-[500] text-blanco">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}
