'use client';
import { InfoInventarioBodega } from '@/types/inventario_bodegas';
import { useEffect } from 'react';
import { AppDispatch } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getInfo } from '@/redux/slice/abastecimiento/thunks';
import { RootState } from '@/redux/reducer';
import { FormAbastecimiento } from '@/types/abastecimieneto';

const Tabla = ({ data }: { data: FormAbastecimiento[] }) => {
  // const data: InfoInventarioBodega[] = [
  //   {
  //     fecha: '01-01-2023',
  //     hora: '10:00',
  //     tipoCilindro: '5kg',
  //     Llenos: 100,
  //     Vacios: 200,
  //     Fallados: 300,
  //     Prestados: 400,
  //   },
  //   {
  //     fecha: '02-01-2023',
  //     hora: '10:00',
  //     tipoCilindro: '11kg',
  //     Llenos: 150,
  //     Vacios: 250,
  //     Fallados: 350,
  //     Prestados: 10,
  //   },
  //   {
  //     fecha: '03-01-2023',
  //     hora: '10:00',
  //     tipoCilindro: '15kg',
  //     Llenos: 120,
  //     Vacios: 220,
  //     Fallados: 320,
  //     Prestados: 15,
  //   },
  //   {
  //     fecha: '04-01-2023',
  //     hora: '10:00',
  //     tipoCilindro: '45kg',
  //     Llenos: 130,
  //     Vacios: 230,
  //     Fallados: 330,
  //     Prestados: 20,
  //   },
  //   {
  //     fecha: '05-01-2023',
  //     hora: '10:00',
  //     tipoCilindro: 'H15',
  //     Llenos: 140,
  //     Vacios: 240,
  //     Fallados: 340,
  //     Prestados: 25,
  //   },
  // ];

  return (
    <div className="overflow-x-auto border-[1px] rounded-xl max-w-4xl ">
      <table className="min-w-full divide-y divide-gray-200 ">
        <thead className="bg-blanco">
          <tr className="[&>*]:text-center [&>*]:py-4  [&>*]:text-xs [&>*]:text-14px">
            <th>Fecha</th>
            <th>Hora</th>
            <th>Tipo de cilindro</th>
            <th>Llenos</th>
            <th>Vacios</th>
            <th>Fallados</th>
            <th>Prestados</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr key={index} className="[&>*]:py-6 [&>*]:font-medium [&>*]:text-center ">
              <td className="text-14px">{row.fecha}</td>
              <td className="text-14px">{row.hora}</td>
              <td className="text-secondary-14px text-center">{row.tipoCilindro.tipo}</td>
              <td className="text-secondary-14px">{row.estadoCilindro.tipo === 'Lleno' ? row.cantidad : 0}</td>
              <td className="text-secondary-14px">{row.estadoCilindro.tipo === 'Vacío' ? row.cantidad : 0}</td>
              <td className="text-secondary-14px ">{row.estadoCilindro.tipo === 'Fallado' ? row.cantidad : 0}</td>
              <td className="text-secondary-14px text-center">
                {row.estadoCilindro.tipo === 'Prestado' ? row.cantidad : 0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function InventarioBodega() {
  const dispatch: AppDispatch = useDispatch();
  const data = useSelector((state: RootState) => state.abastecimiento.data);
  useEffect(() => {
    dispatch(getInfo());
  }, [dispatch]);

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
              <input className="p-4 h-14 bg-gris-1 rounded-xl text-gris-2 " type="date" />
            </div>
            <div className=" flex flex-col w-60">
              <p className="text-16px py-2 ">Hora</p>
              <input type="text" className="p-4 h-14 bg-gris-1 rounded-xl" placeholder="Hora" />
            </div>
          </div>
        </div>
        <button className="bg-blue-400  text-white max-w-lg rounded-xl w-full my-4 py-3 md:px-10 font-bold">
          Buscar
        </button>
      </form>

      <div className="py-3">
        <Tabla data={data} />
      </div>
    </div>
  );
}
