'use client';

import { useState, ChangeEvent, FocusEvent } from 'react';
import { AppDispatch } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { FormAbastecimiento } from '@/types/abastecimieneto';
import { estadoCilindros, estadoModificar, tipoCilindros } from '@/arraysObjects/dataCilindros';
import { crearFormulario } from '@/redux/slice/abastecimiento/thunks';
import moment from 'moment';
import { generateId } from '@/utils/generateId';
import { RootState } from '@/redux/reducer';
import SelectInput from './selectInput';

export default function Formulario() {
  const dispatch: AppDispatch = useDispatch();

  const [formAbastecimiento, setFormAbastecimiento] = useState<FormAbastecimiento>({
    id: '',
    fecha: '',
    hora: '',
    cantidad: 0,
    tipoCilindro: { id: '', tipo: '' },
    estadoCilindro: { id: '', tipo: '' },
    modificar: { id: '', tipo: '' },
  });

  const [cantidadError, setCantidadError] = useState(false);

  const dataStatus = useSelector((state: RootState) => state.abastecimiento.status);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'cantidad' && Number(value) < 0) {
      setCantidadError(true);
      return;
    }

    setFormAbastecimiento({
      ...formAbastecimiento,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === 'cantidad' && e.target.value) {
      setCantidadError(false);
    }
  };

  const handleCantidadBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (!formAbastecimiento.cantidad) {
      setCantidadError(true);
    } else {
      setCantidadError(false);
    }
  };

  const registrarAbastecimiento = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const now = moment();

    const newId = generateId();
    const newFecha = moment(now).format('YYYY-MM-DD');
    const newHora = moment(now).format('HH:mm:ss');

    if (cantidadError) {
      return;
    }

    dispatch(
      crearFormulario({
        ...formAbastecimiento,
        id: newId,
        fecha: newFecha,
        hora: newHora,
      }),
    );
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
                  name="estadoCilindro"
                  formAbastecimiento={formAbastecimiento}
                  setFormAbastecimiento={setFormAbastecimiento}
                  arrayCilindros={estadoCilindros}
                />
              </div>
              <div className="w-full flex flex-col gap-y-2">
                <p className="text-16px py-2">Tipo de cilindro</p>
                <SelectInput
                  name="tipoCilindro"
                  formAbastecimiento={formAbastecimiento}
                  setFormAbastecimiento={setFormAbastecimiento}
                  arrayCilindros={tipoCilindros}
                />
              </div>
            </div>

            <div className="w-1/2 flex flex-col gap-y-3 ">
              <div className="w-full flex flex-col gap-y-2">
                <p className="text-16px py-2">Cantidad recibida</p>
                <input
                  name="cantidad"
                  value={formAbastecimiento.cantidad}
                  onChange={handleOnChange}
                  onBlur={handleCantidadBlur}
                  className={`p-4 h-14 rounded-xl max-w-[23rem] w-full border ${cantidadError ? 'border-red-500' : 'bg-gris-1'}`}
                  type="number"
                  min="0"
                  placeholder="Ingresar cantidad"
                />
                {cantidadError && <p className="text-red-500">*falta agregar cantidad*</p>}
              </div>
              <div className="w-full flex flex-col gap-y-2">
                <p className="text-16px py-2">Acciones</p>
                <SelectInput
                  name="modificar"
                  formAbastecimiento={formAbastecimiento}
                  setFormAbastecimiento={setFormAbastecimiento}
                  arrayCilindros={estadoModificar}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <button
              onClick={(e) => registrarAbastecimiento(e)}
              className="w-5/12 h-12 bg-azul rounded-xl font-Inter font-[500] text-blanco">
              Registrar
            </button>
            {dataStatus === 'loading' && <p>Cargando...</p>}
            {dataStatus === 'failed' && <p>❌Datos Incorrectos o no ingresados</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
