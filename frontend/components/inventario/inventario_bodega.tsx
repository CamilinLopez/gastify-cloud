'use client';
import moment from 'moment';
import { useEffect, useState, ChangeEvent, FocusEvent } from 'react';
import { AppDispatch } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getTablaBodega } from '@/redux/slice/inventario/thunks';
import { RootState } from '@/redux/reducer';

const Tabla = () => {
  const data = useSelector((state: RootState) => state.inventario.tablaBodegaFiteredByDate);

  return (
    <div className="overflow-x-auto border-[1px] rounded-xl max-w-4xl ">
      <table className="min-w-full divide-y divide-gray-200 ">
        <thead className="bg-blanco">
          <tr className="[&>*]:text-center [&>*]:py-4  [&>*]:text-xs [&>*]:text-14px">
            <th>Fecha</th>
            <th>Tipo de cilindro</th>
            <th>Llenos</th>
            <th>Vacios</th>
            <th>Fallados</th>
            <th>Prestados</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data?.tipos.map((row, index) => (
            <tr key={index} className="[&>*]:py-6 [&>*]:font-medium [&>*]:text-center ">
              <td className="text-14px">{data?.fecha}</td>
              <td className="text-secondary-14px text-center">{row.tipoCilindro}</td>
              <td className="text-secondary-14px">{row.estados?.Lleno || 0}</td>
              <td className="text-secondary-14px">{row.estados?.Vacío || 0}</td>
              <td className="text-secondary-14px ">{row.estados?.Fallado || 0}</td>
              <td className="text-secondary-14px text-center">{row.estados?.Prestado || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function InventarioBodega() {
  const [form, setForm] = useState({
    fecha: '',
    hora: '',
  });

  const [fechaError, setFechaError] = useState(false);
  const [horaError, setHoraError] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const now = moment();
      const date = moment(now).format('YYYY-MM-DD');
      await dispatch(getTablaBodega(date));
    };

    fetchData();
  }, [dispatch]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === 'fecha' && e.target.value) {
      setFechaError(false);
    }
    if (e.target.name === 'hora' && e.target.value) {
      setHoraError(false);
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (e.target.name === 'fecha' && !form.fecha) {
      setFechaError(true);
    }
    if (e.target.name === 'hora' && !form.hora) {
      setHoraError(true);
    }
  };

  const buscar = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!form.fecha) {
      setFechaError(true);
      return;
    }
    if (!form.hora) {
      setHoraError(true);
      return;
    }

    const date = form.fecha;
    dispatch(getTablaBodega(date));
  };

  return (
    <div className="p-4 w-full">
      <h3 className="text-18px py-4 " id="inventario_bodegas">
        Inventario de Bodega
      </h3>

      <p className="text-18px pb-4">Buscar Por Fecha y Hora</p>

      <form>
        <div className="flex">
          <div className="flex w-full gap-4 max-w-xl items-center ">
            <div className=" flex flex-col w-60">
              <p className="text-16px py-2">Fecha</p>
              <input
                name="fecha"
                value={form.fecha}
                onChange={handleOnChange}
                onBlur={handleBlur}
                className={`p-4 h-14 rounded-xl text-gris-2 ${fechaError ? 'border-red-500' : 'bg-gris-1'}`}
                type="date"
              />
              {fechaError && <p className="text-red-500 text-xs">*falta agregar fecha*</p>}
            </div>
            <div className=" flex flex-col w-60">
              <p className="text-16px py-2 ">Hora</p>
              <input
                name="hora"
                value={form.hora}
                onChange={handleOnChange}
                onBlur={handleBlur}
                className={`p-4 h-14 rounded-xl ${horaError ? 'border-red-500' : 'bg-gris-1'}`}
                type="text"
                placeholder="Hora"
              />
              {horaError && <p className="text-red-500 text-xs">*falta agregar hora*</p>}
            </div>
          </div>
        </div>
        <button
          onClick={(e) => buscar(e)}
          className="bg-blue-400  text-white max-w-lg rounded-xl w-full my-4 py-3 md:px-10 font-bold">
          Buscar
        </button>
      </form>

      <div className="py-3">
        <Tabla />
      </div>
    </div>
  );
}
