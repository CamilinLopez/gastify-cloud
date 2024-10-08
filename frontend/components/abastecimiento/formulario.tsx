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

export default function Formulario() {
  const dispatch: AppDispatch = useDispatch();

  //estados
  const [formAbastecimiento, setFormAbastecimiento] = useState<FormAbastecimiento>({
    id: '',
    fecha: '',
    hora: '',
    cantidad: 0,
    tipoCilindro: { id: '', tipo: '' },
    estadoCilindro: { id: '', tipo: '' },
    modificar: { id: '', tipo: '' },
    empresaId: '',
  });
  const [errors, setErrors] = useState<ErrorsForms>({});

  const dataStatus = useSelector((state: RootState) => state.abastecimiento.status);

  //funciones
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormAbastecimiento({
      ...formAbastecimiento,
      [e.target.name]: e.target.value,
    });
  };
  const registrarAbastecimiento = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const token = Cookies.get('token');
    if (!token) return undefined;
    const decoded = jwt.decode(token) as JwtPayload | null;
    let empresaId = typeof decoded === 'object' && decoded !== null ? decoded.empresaId : undefined;
    const userId = typeof decoded === 'object' && decoded !== null ? decoded.id : undefined;

    if (!empresaId) empresaId = userId; // en caso de que empresaId no tenga nada, el id de la empresa se queda en userId

    const now = moment();
    const newId = generateId();
    const newFecha = moment(now).format('YYYY-MM-DD');
    const newHora = moment(now).format('HH:mm:ss');

    const validationErrors = validate(formAbastecimiento);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      dispatch(
        crearFormulario({
          ...formAbastecimiento,
          id: newId,
          fecha: newFecha,
          hora: newHora,
          empresaId: empresaId,
        }),
      );
    }
  };

  return (
    <div className="p-4 w-full">
      <h1 className="text-18px py-6 dark:text-textDark" id="registro_abastecimiento">
        Registro de abastecimiento
      </h1>

      <div className="w-full">
        <form className="w-full flex flex-col gap-y-5" action="">
          <div className="w-full flex flex-col movile:flex-row">
            <div className="w-full movile:w-1/2 flex flex-col gap-y-3 ">
              <div className="w-full flex flex-col gap-y-2">
                <p className="text-16px py-2 dark:text-textDark">Estado de cilindro</p>
                <SelectInput
                  name="estadoCilindro"
                  formAbastecimiento={formAbastecimiento}
                  setFormAbastecimiento={setFormAbastecimiento}
                  arrayCilindros={estadoCilindros}
                />
                <p className="font-mono text-[15px] text-red-500">{errors.estadoCilindro}</p>
              </div>
              <div className="w-full flex flex-col gap-y-2">
                <p className="text-16px py-2 dark:text-textDark">Tipo de cilindro</p>
                <SelectInput
                  name="tipoCilindro"
                  formAbastecimiento={formAbastecimiento}
                  setFormAbastecimiento={setFormAbastecimiento}
                  arrayCilindros={tipoCilindros}
                />
                <p className="font-mono text-[15px] text-red-500">{errors.tipoCilindro}</p>
              </div>
            </div>

            <div className="w-full movile:w-1/2  flex flex-col gap-y-3 ">
              <div className="w-full flex flex-col gap-y-2">
                <p className="text-16px py-2 dark:text-textDark">Cantidad recibida</p>
                <input
                  name="cantidad"
                  value={formAbastecimiento.cantidad}
                  onChange={handleOnChange}
                  className="p-4 h-14 bg-gris-1 dark:text-textDark dark:bg-bgDark1 rounded-xl w-full movile:w-10/12"
                  type="number"
                  min="0"
                  placeholder="Ingresar cantidad"
                />
                <p className="font-mono text-[15px] text-red-500">{errors.cantidad}</p>
              </div>
              <div className="w-full flex flex-col gap-y-2">
                <p className="text-16px py-2 dark:text-textDark">Acciones</p>
                <SelectInput
                  name="modificar"
                  formAbastecimiento={formAbastecimiento}
                  setFormAbastecimiento={setFormAbastecimiento}
                  arrayCilindros={estadoModificar}
                />
                <p className="font-mono text-[15px] text-red-500">{errors.modificar}</p>
              </div>
            </div>
          </div>

          {/* <div className="w-full">
            <p className="text-16px py-2">Observaciones</p>
            <textarea className="w-5/12 h-36 bg-gris-1 rounded-xl" />
          </div> */}
          <div className="flex flex-col">
            <button
              onClick={(e) => registrarAbastecimiento(e)}
              className="w-full movile:w-5/12 h-12 bg-azul rounded-xl font-Inter font-[500] dark:text-textDark text-blanco">
              {dataStatus === 'loading' ? <p>Cargando...</p> : 'Registrar'}
            </button>
            <p className="font-mono text-[15px] text-red-500">{dataStatus === 'failed' && 'Error en el servidor'}</p>
          </div>
        </form>
      </div>
    </div>
  );
}
