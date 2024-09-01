'use client';
import moment from 'moment';
import { useEffect, useState, ChangeEvent } from 'react';
import { AppDispatch } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getTablaBodega } from '@/redux/slice/inventario/thunks';
import { RootState } from '@/redux/reducer';

const Tabla = () => {
  const data = useSelector((state: RootState) => state.inventario.tablaBodegaFiteredByDate);

  return (
    <div className="overflow-x-auto border-[1px] dark:border-borderDarck rounded-xl max-w-4xl ">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-borderDarck">
        <thead className="bg-blanco">
          <tr className="[&>*]:text-center [&>*]:py-4  [&>*]:text-xs [&>*]:text-14px dark:text-textDark dark:bg-bgDark1">
            <th>Fecha</th>
            <th>Tipo de cilindro</th>
            <th>Llenos</th>
            <th>Vacios</th>
            <th>Fallados</th>
            <th>Prestados</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-bgDark1 dark:divide-borderDarck">
          {data?.tipos.map((row, index) => (
            <tr key={index} className="[&>*]:py-6 [&>*]:font-medium [&>*]:text-center">
              <td className="text-14px dark:text-textDark">{data?.fecha}</td>
              <td className="text-secondary-14px text-center dark:text-textDark">{row.tipoCilindro}</td>
              <td className="text-secondary-14px dark:text-textDark">{row.estados?.Lleno || 0}</td>
              <td className="text-secondary-14px dark:text-textDark">{row.estados?.Vacío || 0}</td>
              <td className="text-secondary-14px dark:text-textDark">{row.estados?.Fallado || 0}</td>
              <td className="text-secondary-14px text-center dark:text-textDark">{row.estados?.Prestado || 0}</td>
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
      await dispatch(getTablaBodega(date));
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
    dispatch(getTablaBodega(date));
  };

  return (
    <div className="p-4 w-full">
      <h3 className="text-18px py-4 dark:text-textDark" id="inventario_bodegas">
        Inventario de Bodega
      </h3>

      <p className="text-18px pb-4 dark:text-textDark">Buscar Por Fecha y Hora</p>

      <form>
        <div className="flex">
          <div className="flex w-full gap-4 max-w-xl items-center ">
            <div className=" flex flex-col w-60">
              <p className="text-16px py-2 dark:text-textDark">Fecha</p>
              <input
                name="fecha"
                value={form.fecha}
                onChange={handleOnChange}
                className="p-4 h-14 bg-gris-1 dark:bg-bgDark1 rounded-xl text-gris-2 "
                type="date"
              />
            </div>
            <div className=" flex flex-col w-60">
              <p className="text-16px py-2 dark:text-textDark">Hora</p>
              <input type="text" className="p-4 h-14 bg-gris-1 dark:bg-bgDark1 rounded-xl" placeholder="Hora" />
            </div>
          </div>
        </div>
        <button
          onClick={(e) => buscar(e)}
          className="bg-azul dark:text-textDark  text-white max-w-lg rounded-xl w-full my-4 py-3 md:px-10 font-bold">
          Buscar
        </button>
      </form>

      <div className="py-3">
        <Tabla />
      </div>
    </div>
  );
}
