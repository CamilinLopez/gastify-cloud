'use client';

import { RootState } from '@/redux/reducer';
import { GetTablaReportesDiarios, GetTablaVisualCarga } from '@/redux/slice/operaciones/thunks';
import { AppDispatch } from '@/redux/store';
import { EstadosTablas, InfoInventarioCamiones, TipoCilindro, TypeShowTalbas } from '@/types/inventario_camiones';
import { InfoReportesDiarios } from '@/types/operaciones';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Tabla1: React.FC<TypeShowTalbas> = ({ estado, setEstado }) => {
  const dispatch: AppDispatch = useDispatch();

  const tabla = useSelector((state: RootState) => state.operaciones.responseTablaReportesDiarios.result);

  const cambioTablas = (e: React.MouseEvent<HTMLButtonElement>, detalleTabla: InfoReportesDiarios) => {
    e.preventDefault();
    dispatch(GetTablaVisualCarga(detalleTabla.id));
    setEstado({ ...estado, showTabla1: false, showTabla2: true });
  };

  return (
    <div className="overflow-x-auto border-[1px] rounded-xl max-w-4xl ">
      <table className="min-w-full divide-y divide-gray-200 ">
        <thead className="bg-blanco">
          <tr className="[&>*]:text-center [&>*]:py-4  [&>*]:text-xs [&>*]:text-14px">
            <th>ID Movimiento</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Numero de Movil</th>
            <th>ID del conductor</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tabla.map((row, index) => (
            <tr key={index} className="[&>*]:py-6 [&>*]:font-medium [&>*]:text-center ">
              <td className="text-14px">{row.id}</td>
              <td className="text-14px">{row.fecha}</td>
              <td className="text-14px">{row.hora}</td>
              <td className="text-secondary-14px text-center">{row.camion}</td>
              <td className="text-secondary-14px text-center">{row.conductor}</td>
              <td className="text-secondary-14px text-center">
                <button
                  onClick={(e) => cambioTablas(e, row)}
                  className="bg-azul rounded-xl font-Inter font-[500] text-blanco py-1 px-2">
                  Abrir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Tabla2: React.FC<TypeShowTalbas> = ({ estado, setEstado }) => {
  const data: InfoInventarioCamiones[] = [
    {
      'ID Movimiento': '155746',
      fecha: '01-01-2023',
      hora: '10:00',
      numeroMovil: 123,
      IDdelConductor: 100,
      Accion: 'Cerrar',
    },
  ];

  const info: TipoCilindro[] = [
    {
      'Tipo de cilindro': '5kg',
      Llenos: 36,
      Vacíos: 96,
      Fallados: 65,
      Prestados: 96,
    },
    {
      'Tipo de cilindro': '11kg',
      Llenos: 36,
      Vacíos: 96,
      Fallados: 65,
      Prestados: 96,
    },
    {
      'Tipo de cilindro': '45kg',
      Llenos: 36,
      Vacíos: 96,
      Fallados: 65,
      Prestados: 96,
    },
    {
      'Tipo de cilindro': 'H15kg',
      Llenos: 36,
      Vacíos: 96,
      Fallados: 65,
      Prestados: 96,
    },
  ];

  const cambioTablas = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEstado({ ...estado, showTabla1: true, showTabla2: false });
  };
  return (
    <div className="overflow-x-auto border-[1px] rounded-xl max-w-4xl ">
      <table className="min-w-full divide-y divide-gray-200 ">
        <thead className="bg-blanco">
          <tr className="[&>*]:text-center [&>*]:py-4  [&>*]:text-xs [&>*]:text-14px">
            <th>ID Movimiento</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Numero de Movil</th>
            <th>ID del conductor</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr key={index} className="[&>*]:py-6 [&>*]:font-medium [&>*]:text-center ">
              <td className="text-14px">{row['ID Movimiento']}</td>
              <td className="text-14px">{row.fecha}</td>
              <td className="text-14px">{row.hora}</td>
              <td className="text-secondary-14px text-center">{row.numeroMovil}</td>
              <td className="text-secondary-14px text-center">{row.IDdelConductor}</td>
              <td className="text-secondary-14px text-center">
                <button
                  onClick={(e) => cambioTablas(e)}
                  className="bg-azul rounded-xl font-Inter font-[500] text-blanco py-1 px-2">
                  Cerrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <thead>
          <tr className="[&>*]:text-center [&>*]:py-4  [&>*]:text-xs [&>*]:text-14px">
            <th>Tipo de Cilindro</th>
            <th>Llenos</th>
            <th>Vacíos </th>
            <th>Fallados</th>
            <th>Prestados</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {info.map((row, index) => (
            <tr key={index} className="[&>*]:py-6 [&>*]:font-medium [&>*]:text-center ">
              <td className="text-14px">{row['Tipo de cilindro']}</td>
              <td className="text-14px">{row.Llenos}</td>
              <td className="text-14px">{row.Vacíos}</td>
              <td className="text-secondary-14px text-center">{row.Fallados}</td>
              <td className="text-secondary-14px text-center">{row.Prestados}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function InventarioCamiones() {
  const [showTablas, SetShowTablas] = useState<EstadosTablas>({
    showTabla1: true,
    showTabla2: false,
  });
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(GetTablaReportesDiarios());
  }, [dispatch]);

  return (
    <div className="p-4 w-full">
      <h3 className="text-18px py-4 " id="inventario_camiones">
        Inventario En Camiones
      </h3>

      <form className="text-16px max-w-2xl">
        <div className="flex gap-2 flex-wrap">
          <label>
            <p className="text-16px py-2 ">Número de Movil</p>
            <div>
              <input
                type="string"
                className="border pl-4 max-w-60 bg-gris-1 rounded-xl py-3 text-gris-2"
                placeholder="Número de Movil"
              />
            </div>
          </label>

          <label>
            <p className="text-16px py-2 ">ID condutor</p>
            <div>
              <input
                type="string"
                className="border pl-4 max-w-60 bg-gris-1 rounded-xl py-3 text-gris-2"
                placeholder="ID conductor"
              />
            </div>
          </label>

          <label>
            <div>
              <p className="text-16px py-2">Fecha</p>
              <div>
                <input className="border w-60 px-4  max-w-60  bg-gris-1 rounded-xl py-3 text-gris-2 " type="date" />
              </div>
            </div>
          </label>

          <label>
            <p className="text-16px py-2 ">Hora</p>
            <div>
              <input
                type="string"
                className="border pl-4 max-w-60 bg-gris-1 rounded-xl py-3 text-gris-2"
                placeholder="Hora"
              />
            </div>
          </label>
        </div>
        <button className="bg-blue-400 text-white max-w-xl rounded-xl w-full my-4 py-3 md:px-10 font-bold">
          Buscar
        </button>
      </form>

      <div className="py-3">
        {showTablas.showTabla1 === true && <Tabla1 setEstado={SetShowTablas} estado={showTablas} />}
        {showTablas.showTabla2 === true && <Tabla2 setEstado={SetShowTablas} estado={showTablas} />}
      </div>
    </div>
  );
}
