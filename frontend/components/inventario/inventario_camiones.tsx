'use client';

import { InfoInventarioCamiones, Tabla1Props, TipoCilindro } from '@/types/inventario_camiones';
import { useState } from 'react';

const Tabla1: React.FC<Tabla1Props> = ({ SetIdMovimiento }) => {
  const data: InfoInventarioCamiones[] = [
    {
      'ID Movimiento': '155746',
      fecha: '01-01-2023',
      hora: '10:00',
      numeroMovil: 123,
      IDdelConductor: 100,
      Accion: 'Abrir',
    },
    {
      'ID Movimiento': '1557832',
      fecha: '02-01-2023',
      hora: '10:00',
      numeroMovil: 456,
      IDdelConductor: 150,
      Accion: 'Abrir',
    },
    {
      'ID Movimiento': '1554532',
      fecha: '03-01-2023',
      hora: '10:00',
      numeroMovil: 789,
      IDdelConductor: 120,
      Accion: 'Abrir',
    },
    {
      'ID Movimiento': '1554589',
      fecha: '04-01-2023',
      hora: '10:00',
      numeroMovil: 12,
      IDdelConductor: 130,
      Accion: 'Abrir',
    },
    {
      'ID Movimiento': '154236',
      fecha: '05-01-2023',
      hora: '10:00',
      numeroMovil: 345,
      IDdelConductor: 140,
      Accion: 'Abrir',
    },
  ];

  const getIDMovimiento = (id: string) => {
    SetIdMovimiento(id);
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
                  onClick={() => getIDMovimiento(row['ID Movimiento'])}
                  className="bg-azul rounded-xl font-Inter font-[500] text-blanco py-1 px-2">
                  {row.Accion}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Tabla2 = () => {
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

  const getIDMovimiento = (id: string) => {};
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
                  onClick={() => getIDMovimiento(row['ID Movimiento'])}
                  className="bg-azul rounded-xl font-Inter font-[500] text-blanco py-1 px-2">
                  {row.Accion}
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
  const [idMovimiento, SetIdMovimiento] = useState<string>('');
  const [showTabla1, SetShowTabla1] = useState<boolean>(true);

  return (
    <div className="p-4 w-full">
      <h3 className="text-18px py-4 " id="inventario_camiones">
        Inventario En Camiones
      </h3>

      <form className="text-16px max-w-2xl">
        <div className="flex gap-8 flex-wrap">
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
                <input
                  className="border w-60 px-2  max-w-60  bg-gris-1 rounded-xl py-3 text-gris-2 "
                  type="date"
                />
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

      <div className="py-3">{showTabla1 ? <Tabla1 SetIdMovimiento={SetIdMovimiento} /> : <Tabla2 />}</div>
    </div>
  );
}
