'use client';

import { DiferentesCilindros } from '@/types/diferentes_cilindros';
import {
  CargaDatos,
  InfoReportesDiarios,
  nameCilindro,
  TablaCargaProps,
  TypeTablaDescarga,
  TablaReportesDiarias,
  EstadoCarga,
  TypeTablaVisualCarga,
} from '@/types/operaciones';
import { ChangeEvent, useEffect, useState } from 'react';
import { tipoCilindros } from '@/arraysObjects/dataCilindros';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { GetTablaReportesDiarios, GetTablaVisualCarga, TablaCargaThunk } from '@/redux/slice/operaciones/thunks';
import { AutocompletableCamiones, AutocompletableConductores } from './desplegables';
import { RootState } from '@/redux/reducer';
import { getTablaConductores, tablaCamion } from '@/redux/slice/inventario/thunks';

const TablaCarga: React.FC<TablaCargaProps> = ({ estado, setEstado }) => {
  const dispatch: AppDispatch = useDispatch();

  const [infoCilindros, setInfoCilindros] = useState<nameCilindro>({
    '5kg': { cantidad: '', cilindro: { id: '', tipo: '' } },
    '11kg': { cantidad: '', cilindro: { id: '', tipo: '' } },
    '15kg': { cantidad: '', cilindro: { id: '', tipo: '' } },
    '45kg': { cantidad: '', cilindro: { id: '', tipo: '' } },
    H15: { cantidad: '', cilindro: { id: '', tipo: '' } },
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, id } = e.target;

    setInfoCilindros((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name as keyof nameCilindro],
        cantidad: Number(value),
        cilindro: {
          ...prevState[name as keyof nameCilindro].cilindro,
          id,
          tipo: name,
        },
      },
    }));
  };

  const registrar = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const infoCilindrosArray = Object.entries(infoCilindros).map(([tipo, { cantidad, cilindro }]) => ({
      cantidad,
      cilindro: {
        id: cilindro.id,
        tipo: cilindro.tipo,
      },
    }));
    const data = { ...estado, carga_cilindros: infoCilindrosArray };
    dispatch(TablaCargaThunk(data));
  };

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
            {tipoCilindros.map((row, index) => (
              <tr key={index} className="[&>*]:py-6 [&>*]:font-medium [&>*]:text-center">
                <td className="text-secondary-14px text-center">{row.tipo}</td>
                <td className="text-secondary-14px text-center">
                  <input
                    id={String(row.id)}
                    name={row.tipo}
                    value={infoCilindros[row.tipo]?.cantidad}
                    onChange={handleOnChange}
                    type="number"
                    className="w-10  text-black overflow-hidden"
                    placeholder="0"
                  />
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
      <button
        onClick={(e) => registrar(e)}
        className="bg-blue-400  text-white max-w-xl rounded-xl w-full my-4 py-3 md:px-10 font-bold">
        Registrar
      </button>
    </>
  );
};

const TablaDescarga: React.FC<TypeTablaDescarga> = ({ datosCarga, estado, setEstado }) => {
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

  const estadoTablas = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEstado({
      ...estado,
      openTablaDescarga: false,
      openTablaOperaciones: true,
      openTablaCarga: false,
    });
  };

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
              <td className="px-6 py-4 font-Inter font-[400] text-[#121417] text-[14px]">{datosCarga.id}</td>
              <td className="px-6 py-4 font-Inter font-[400] text-[#121417] text-[14px]">{datosCarga.fecha}</td>
              <td className="px-6 py-4 font-Inter font-[400] text-[#121417] text-[14px]">{datosCarga.camion}</td>
              <td className="px-6 py-4 font-Inter font-[400] text-[#121417] text-[14px]">{datosCarga.conductor}</td>
              <td className="px-6 py-4 font-Inter font-[400] text-[#121417] text-[14px]">
                <button
                  onClick={(e) => estadoTablas(e)}
                  className="bg-azul rounded-xl font-Inter font-[500] text-blanco py-1 px-2">
                  Cerrar
                </button>
              </td>
            </tr>
          </tbody>

          <thead className="bg-blanco">
            <tr className="[&>*]:text-center [&>*]:py-4  [&>*]:text-xs [&>*]:text-14px">
              <th>Tipo de cilindro</th>
              <th>Cantidad de Fallados</th>
              <th>Cantidad prestados</th>
              <th>Cantidad Vacios</th>
              <th>Cantidad Lenos</th>
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
                  <input type="number" className="w-10 text-black overflow-hidden" placeholder="0" />
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

const TablaOperaciones: React.FC<TablaReportesDiarias> = ({ infoCarga, tabla, estado, setEstado }) => {
  const textTable = ['ID', 'Fecha', 'Número de Móvil', 'Nombre del Conductor', 'Acciones'];
  const dispatch: AppDispatch = useDispatch();

  const estadoTablaDescarga = (e: React.MouseEvent<HTMLButtonElement>, carga: InfoReportesDiarios) => {
    e.preventDefault();

    infoCarga.setCarga({
      ...infoCarga.carga,
      id: carga.id,
      fecha: carga.fecha,
      camion: carga.camion,
      conductor: carga.conductor,
      hora: carga.hora,
    });

    setEstado({
      ...estado,
      openTablaOperaciones: false,
      openTablaDescarga: true,
      openTablaCarga: false,
    });
  };

  const estadoTablacarga = (e: React.MouseEvent<HTMLButtonElement>, carga: InfoReportesDiarios) => {
    e.preventDefault();

    //se hace un get al servidor con el carga_id para obtener el detalle de carga en la tablaVisualcarga
    dispatch(GetTablaVisualCarga(carga.id));

    infoCarga.setCarga({
      ...infoCarga.carga,
      id: carga.id,
      fecha: carga.fecha,
      camion: carga.camion,
      conductor: carga.conductor,
      hora: carga.hora,
    });

    setEstado({
      ...estado,
      openTablaDescarga: false,
      openTablaOperaciones: false,
      openTablaCarga: true,
    });
  };

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
            {tabla.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 text-secondary-14px ">{item.id}</td>
                <td className="px-6 py-4 text-secondary-14px ">{item.fecha}</td>
                <td className="px-6 py-4 text-secondary-14px ">{item.camion}</td>
                <td className="px-6 py-4 text-secondary-14px ">{item.conductor}</td>
                <td className="px-6 py-4 text-secondary-14px ">
                  <button onClick={(e) => estadoTablaDescarga(e, item)} className="text-start underline">
                    Abrir Tabla de Descarga
                  </button>
                  <button onClick={(e) => estadoTablacarga(e, item)} className="text-start underline">
                    Abrir Tabla de Carga
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TablaVisualCarga: React.FC<TypeTablaVisualCarga> = ({ carga, estado, setEstado }) => {
  const infoTablaVisual = useSelector((state: RootState) => state.operaciones.responseTablaVisualCarga.result);
  const estadoTablas = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEstado({
      ...estado,
      openTablaCarga: false,
      openTablaDescarga: false,
      openTablaOperaciones: true,
    });
  };

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
              <td className="px-6 py-4 font-Inter font-[400] text-[#121417] text-[14px]">{carga.id}</td>
              <td className="px-6 py-4 font-Inter font-[400] text-[#121417] text-[14px]">{carga.fecha}</td>
              <td className="px-6 py-4 font-Inter font-[400] text-[#121417] text-[14px]">{carga.camion}</td>
              <td className="px-6 py-4 font-Inter font-[400] text-[#121417] text-[14px]">{carga.conductor}</td>
              <td className="px-6 py-4 font-Inter font-[400] text-[#121417] text-[14px]">
                <button
                  onClick={(e) => estadoTablas(e)}
                  className="bg-azul rounded-xl font-Inter font-[500] text-blanco py-1 px-2">
                  Cerrar
                </button>
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
            {infoTablaVisual.map((row, index) => (
              <tr key={index} className="[&>*]:py-6 [&>*]:font-medium [&>*]:text-center">
                <td className="text-secondary-14px text-center">{row.tipo_cilindro.tipo}</td>
                <td className="text-secondary-14px text-center">{row.cantidad}</td>
                <td className="text-secondary-14px text-center"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default function SectionsOperacion() {
  const dispatch: AppDispatch = useDispatch();

  const conductores = useSelector((state: RootState) => state.inventario.sectionConductores.tabla);
  const camiones = useSelector((state: RootState) => state.inventario.sectionCamiones.tabla);
  const TablaOperacionesDiarias = useSelector(
    (state: RootState) => state.operaciones.responseTablaReportesDiarios.result,
  );

  //este estado controla que tabla se habre.
  const [openTablaOperaciones, setOpenTablaOperaciones] = useState({
    openTablaCarga: false,
    openTablaDescarga: false,
    openTablaOperaciones: true,
  });
  //formulario de tabla de carga
  const [form, setForm] = useState<CargaDatos>({
    numero_movil: { id: '', placa: '' },
    nombre_conductor: { id: '', nombre: '' },
    carga_cilindros: [],
  });
  //carga, se mostrara en la tablaDescargas
  const [carga, setCarga] = useState<InfoReportesDiarios>({
    id: '',
    fecha: '',
    camion: '',
    conductor: '',
    hora: '',
  });

  const infoCarga: EstadoCarga = {
    carga,
    setCarga,
  };

  useEffect(() => {
    dispatch(getTablaConductores());
    dispatch(tablaCamion());
    dispatch(GetTablaReportesDiarios());
  }, [dispatch]);

  return (
    <div className="p-4 w-full">
      <h3 className="text-18px py-4">Operaciones</h3>

      <div className="flex flex-col gap-5 ">
        <label>
          <p className="text-16px  py-2 ">Número de movil</p>
          <div>
            <AutocompletableCamiones
              camiones={camiones}
              form={form}
              setForm={setForm}
              name="numero_movil"
              placeholder="asdf236"
            />
          </div>
        </label>

        <label>
          <p className="text-16px py-2 ">Nombre conductor</p>
          <div>
            <AutocompletableConductores
              conductores={conductores}
              placeholder="Juan Carlos Lopez"
              name="nombre_conductor"
              form={form}
              setForm={setForm}
            />
          </div>
        </label>
      </div>
      <TablaCarga estado={form} setEstado={setForm} />
      {openTablaOperaciones.openTablaDescarga && (
        <TablaDescarga datosCarga={carga} estado={openTablaOperaciones} setEstado={setOpenTablaOperaciones} />
      )}
      {openTablaOperaciones.openTablaCarga && (
        <TablaVisualCarga carga={carga} estado={openTablaOperaciones} setEstado={setOpenTablaOperaciones} />
      )}
      {openTablaOperaciones.openTablaOperaciones && (
        <TablaOperaciones
          infoCarga={infoCarga}
          tabla={TablaOperacionesDiarias}
          estado={openTablaOperaciones}
          setEstado={setOpenTablaOperaciones}
        />
      )}
    </div>
  );
}
