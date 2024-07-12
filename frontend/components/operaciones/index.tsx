'use client';

import { DiferentesCilindros, TablaOperacionestype } from '@/types/diferentes_cilindros';
import { useState } from 'react';

const TablaCarga = () => {
  const data: DiferentesCilindros[] = [
    {
      tipoCilindro: '5kg',
    },
    {
      tipoCilindro: '11kg',
    },
    {
      tipoCilindro: '15kg',
    },
    {
      tipoCilindro: '45kg',
    },
    {
      tipoCilindro: 'H15',
    },
  ];

  return (
    <>
      <h3 className="text-18px py-4" id="tabla_carga">
        Tabla de Carga
      </h3>
      <div className="overflow-x-auto border-[1px] rounded-xl max-w-4xl ">
        <table className="min-w-full divide-y divide-gray-200 ">
          <thead className="bg-blanco">
            <tr className="[&>*]:text-center [&>*]:py-4  [&>*]:text-xs [&>*]:text-14px ">
              <th>Tipo de cilindro</th>
              <th>Cantidad Cargada</th>
              <th>Observaciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr key={index} className="[&>*]:py-6 [&>*]:font-medium [&>*]:text-center">
                <td className="text-secondary-14px text-center">{row.tipoCilindro}</td>
                <td className="text-secondary-14px text-center">
                  <input type="number" className="w-10  text-black overflow-hidden" placeholder="0" />
                </td>
                <td className="text-secondary-14px text-center">
                  <input
                    type="text"
                    className="text-black overflow-hidden md:ml-12"
                    placeholder="Ingrese sus Observaciones"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="bg-blue-400  text-white max-w-xl rounded-xl w-full my-4 py-3 md:px-10 font-bold">
        Registrar
      </button>
    </>
  );
};

const TablaDescarga = () => {
  const data: DiferentesCilindros[] = [
    {
      tipoCilindro: '5kg',
    },
    {
      tipoCilindro: '11kg',
    },
    {
      tipoCilindro: '15kg',
    },
    {
      tipoCilindro: '45kg',
    },
    {
      tipoCilindro: 'H15',
    },
  ];

  return (
    <>
      <h3 className="text-18px py-4" id="tabla_descarga">
        Tabla de Descarga
      </h3>
      <div className="overflow-x-auto border-[1px] rounded-xl max-w-4xl ">
        <table className="min-w-full divide-y divide-gray-200 ">
          <thead>
            <tr className="[&>*]:text-center [&>*]:py-4  [&>*]:text-xs [&>*]:text-14px">
              <th>Identificador Único de Carga</th>
              <th>Fecha</th>
              <th>Número de Móvil (Camión)</th>
              <th>Nombre del Conductor</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="[&>*]:py-6 [&>*]:font-medium [&>*]:text-center">
              <td className="px-6 py-4 font-Inter font-[400] text-[#121417] text-[14px]">55hvjnf5g</td>
              <td className="px-6 py-4 font-Inter font-[400] text-[#121417] text-[14px]">22/06/30</td>
              <td className="px-6 py-4 font-Inter font-[400] text-[#121417] text-[14px]">hjk658</td>
              <td className="px-6 py-4 font-Inter font-[400] text-[#121417] text-[14px]">julio lopez</td>
              <td className="px-6 py-4 font-Inter font-[400] text-[#121417] text-[14px]">
                <button className="bg-azul rounded-xl font-Inter font-[500] text-blanco py-1 px-2">Cerrar</button>
              </td>
            </tr>
          </tbody>

          <thead className="bg-blanco">
            <tr className="[&>*]:text-center [&>*]:py-4  [&>*]:text-xs [&>*]:text-14px">
              <th>Tipo de cilindro</th>
              <th>Cantidad de Fallados</th>
              <th>Cantidad prestados</th>
              <th>Cantidad Vacios</th>
              <th>Observaciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr key={index} className="[&>*]:py-6 [&>*]:font-medium [&>*]:text-center ">
                <td className="text-secondary-14px text-center">{row.tipoCilindro}</td>
                <td className="text-secondary-14px text-center">
                  <input type="number" className="w-10  text-black overflow-hidden" placeholder="0" />
                </td>
                <td className="text-secondary-14px text-center">
                  <input type="number" className="w-10  text-black overflow-hidden" placeholder="0" />
                </td>
                <td className="text-secondary-14px text-center">
                  <input type="number" className="w-10  text-black overflow-hidden" placeholder="0" />
                </td>
                <td className="text-secondary-14px text-center">
                  <input type="text" className="text-black overflow-hidden" placeholder="Ingrese sus Observaciones" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="bg-blue-400  text-white max-w-xl rounded-xl w-full my-4 py-3 md:px-10 font-bold">
        Registrar
      </button>
    </>
  );
};

const TablaOperaciones = () => {
  const info: TablaOperacionestype[] = [
    {
      ID: 's56sd4f6s',
      Fecha: '24/09/30',
      'Número de Móvil': 'dfg963',
      'Nombre del Conductor': 'Julio Tobar',
    },
  ];
  const textTable = ['ID', 'Fecha', 'Número de Móvil', 'Nombre del Conductor', 'Acciones'];
  return (
    <div className=" w-full">
      <h1 className="text-18px py-6" id="resumen_reportes_diarios">
        Resumen de Reportes Diarios
      </h1>
      <div className="overflow-x-auto border-[1px] rounded-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blanco">
            <tr>
              {textTable.map((item) => (
                <th key={item} className="px-6 py-3 text-left text-xs text-14px">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {info.map((item, i) => (
              <tr key={i}>
                <td className="px-6 py-4 text-secondary-14px ">{item.ID}</td>
                <td className="px-6 py-4 text-secondary-14px ">{item.Fecha}</td>
                <td className="px-6 py-4 text-secondary-14px ">{item['Número de Móvil']}</td>
                <td className="px-6 py-4 text-secondary-14px ">{item['Nombre del Conductor']}</td>
                <td className="px-6 py-4 text-secondary-14px ">
                  <button className="text-start underline">Abrir Tabla de Descarga</button>
                  <button className="text-start underline">Abrir Tabla de Carga</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TablaVisualCarga = () => {
  const data: DiferentesCilindros[] = [
    {
      tipoCilindro: '5kg',
    },
    {
      tipoCilindro: '11kg',
    },
    {
      tipoCilindro: '15kg',
    },
    {
      tipoCilindro: '45kg',
    },
    {
      tipoCilindro: 'H15',
    },
  ];
  const infoVisual = [
    {
      cilindro: '5kg',
      cantidad_cargada: 40,
      Observaciones: 'sdxvs sdvzdxf sxsdv',
    },
    {
      cilindro: '11kg',
      cantidad_cargada: 50,
      Observaciones: 'sdxvs sdvzdxf sxsdv',
    },
    {
      cilindro: '15kg',
      cantidad_cargada: 30,
      Observaciones: 'sdxvs sdvzdxf sxsdv',
    },
    {
      cilindro: '45kg',
      cantidad_cargada: 63,
      Observaciones: 'sdxvs sdvzdxf sxsdv',
    },
    {
      cilindro: 'H15',
      cantidad_cargada: 52,
      Observaciones: 'sdxvs sdvzdxf sxsdv',
    },
  ];
  return (
    <>
      <h3 className="text-18px py-4" id="tabla_carga">
        Tabla visual de Carga
      </h3>
      <div className="overflow-x-auto border-[1px] rounded-xl max-w-4xl ">
        <table className="min-w-full divide-y divide-gray-200 ">
          <thead>
            <tr className="[&>*]:text-center [&>*]:py-4  [&>*]:text-xs [&>*]:text-14px">
              <th>Identificador Único de Carga</th>
              <th>Fecha</th>
              <th>Número de Móvil (Camión)</th>
              <th>Nombre del Conductor</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="[&>*]:py-6 [&>*]:font-medium [&>*]:text-center">
              <td className="px-6 py-4 font-Inter font-[400] text-[#121417] text-[14px]">55hvjnf5g</td>
              <td className="px-6 py-4 font-Inter font-[400] text-[#121417] text-[14px]">22/06/30</td>
              <td className="px-6 py-4 font-Inter font-[400] text-[#121417] text-[14px]">hjk658</td>
              <td className="px-6 py-4 font-Inter font-[400] text-[#121417] text-[14px]">julio lopez</td>
              <td className="px-6 py-4 font-Inter font-[400] text-[#121417] text-[14px]">
                <button className="bg-azul rounded-xl font-Inter font-[500] text-blanco py-1 px-2">Cerrar</button>
              </td>
            </tr>
          </tbody>
          <thead className="bg-blanco">
            <tr className="[&>*]:text-center [&>*]:py-4  [&>*]:text-xs [&>*]:text-14px ">
              <th>Tipo de cilindro</th>
              <th>Cantidad Cargada</th>
              <th>Observaciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {infoVisual.map((row, index) => (
              <tr key={index} className="[&>*]:py-6 [&>*]:font-medium [&>*]:text-center">
                <td className="text-secondary-14px text-center">{row.cilindro}</td>
                <td className="text-secondary-14px text-center">{row.cantidad_cargada}</td>
                <td className="text-secondary-14px text-center">{row.Observaciones}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default function SectionsOperacion() {
  const [openTablaOperaciones, setOpenTablaOperaciones] = useState<boolean>(false);
  return (
    <div className="p-4 w-full">
      <h3 className="text-18px py-4">Operaciones</h3>

      <div className="flex flex-col gap-5 ">
        <label>
          <p className="text-16px py-2 ">Fecha de Operación</p>
          <div>
            <input
              type="string"
              className="border  pl-4 px-20 bg-gris-1  rounded-xl py-3   text-gris-2"
              placeholder="Fecha de Operación"
            />
          </div>
        </label>

        <label>
          <p className="text-16px  py-2 ">Número de movil</p>
          <div>
            <input
              type="text"
              className="border pl-4 px-20 bg-gris-1 rounded-xl py-3  text-gris-2"
              placeholder="Número de movil"
            />
          </div>
        </label>

        <label>
          <p className="text-16px py-2 ">ID conductor</p>
          <div>
            <input
              type="text"
              className="border pl-4 px-20  bg-gris-1 rounded-xl py-3  text-gris-2"
              placeholder="ID conductor"
            />
          </div>
        </label>
      </div>
      <TablaCarga />
      {openTablaOperaciones ? <TablaDescarga /> : <TablaOperaciones />}
    </div>
  );
}
