'use client';
import moment from 'moment';
import { useEffect, useState, ChangeEvent } from 'react';
import { AppDispatch } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getTablaBodega } from '@/redux/slice/inventario/thunks';
import { RootState } from '@/redux/reducer';
import Cookies from 'js-cookie';
import jwt, { JwtPayload } from 'jsonwebtoken';

const Tabla = () => {
  const data = useSelector((state: RootState) => state.inventario.tablaBodegaFiteredByDate);

  return (
    <div className="overflow-x-auto border-[1px] dark:border-borderDarck rounded-xl max-w-4xl">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-borderDarck">
        <thead className="bg-blanco dark:bg-bgDark1">
          <tr className="[&>*]:text-center [&>*]:py-4 [&>*]:text-xs [&>*]:text-14px dark:text-textDark">
            <th className="px-6 py-4 whitespace-nowrap">Fecha</th>
            <th className="px-6 py-4 whitespace-nowrap">Tipo de cilindro</th>
            <th className="px-6 py-4 whitespace-nowrap">Llenos</th>
            <th className="px-6 py-4 whitespace-nowrap">Vacios</th>
            <th className="px-6 py-4 whitespace-nowrap">Fallados</th>
            <th className="px-6 py-4 whitespace-nowrap">Prestados</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-bgDark1 dark:divide-borderDarck">
          {data?.tipos.map((row, index) => (
            <tr key={index} className="[&>*]:py-6 [&>*]:font-medium [&>*]:text-center">
              <td className="px-6 py-4 text-14px dark:text-textDark whitespace-nowrap">{data?.fecha}</td>
              <td className="px-6 py-4 text-secondary-14px text-center dark:text-textDark whitespace-nowrap">
                {row.tipoCilindro}
              </td>
              <td className="px-6 py-4 text-secondary-14px dark:text-textDark whitespace-nowrap">
                {row.estados?.Lleno || 0}
              </td>
              <td className="px-6 py-4 text-secondary-14px dark:text-textDark whitespace-nowrap">
                {row.estados?.Vacío || 0}
              </td>
              <td className="px-6 py-4 text-secondary-14px dark:text-textDark whitespace-nowrap">
                {row.estados?.Fallado || 0}
              </td>
              <td className="px-6 py-4 text-secondary-14px text-center dark:text-textDark whitespace-nowrap">
                {row.estados?.Prestado || 0}
              </td>
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

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const now = moment();
      const date = moment(now).format('YYYY-MM-DD');

      const token = Cookies.get('token');
      if (!token) return undefined;
      const decoded = jwt.decode(token) as JwtPayload | null;

      const empresaId = typeof decoded === 'object' && decoded !== null ? decoded.id : undefined;

      await dispatch(getTablaBodega({ fecha: date, empresaId }));
    };

    fetchData();
  }, [dispatch]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const buscar = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const date = form.fecha;

    const token = Cookies.get('token');
    if (!token) return undefined;
    const decoded = jwt.decode(token) as JwtPayload | null;
    const empresaId = typeof decoded === 'object' && decoded !== null ? decoded.id : undefined;

    dispatch(getTablaBodega({ fecha: date, empresaId }));
  };

  return (
    <div className="p-2 movile:p-4 w-full">
      <h3 className="text-18px py-4 dark:text-textDark" id="inventario_bodegas">
        Inventario de Bodega
      </h3>

      <p className="text-18px pb-4 dark:text-textDark">Buscar Por Fecha y Hora</p>

      <form>
        <div className="flex flex-col movile:flex-row">
          <div className="flex flex-col movile:flex-row w-full gap-4 max-w-xl items-end">
            <div className=" flex flex-col w-full movile:w-60">
              <p className="text-16px py-2 dark:text-textDark">Fecha</p>
              <input
                name="fecha"
                value={form.fecha}
                onChange={handleOnChange}
                className="p-4 h-14 bg-gris-1 dark:bg-bgDark1 rounded-xl text-gris-2 "
                type="date"
              />
            </div>
            <div className="flex flex-col w-full">
              <button
                onClick={(e) => buscar(e)}
                className="bg-azul dark:text-textDark  text-white max-w-lg rounded-xl w-full  py-4 md:px-10 font-bold">
                Buscar
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="py-3">
        <Tabla />
      </div>
    </div>
  );
}
