'use client';

import {
  CargaDatos,
  InfoReportesDiarios,
  nameCilindro,
  TablaCargaProps,
  TypeTablaDescarga,
  TablaReportesDiarias,
  EstadoCarga,
  TypeTablaVisualCarga,
  Formulario,
  cargaDatosTablaDescarga,
  formularioVentas,
  cargaDatosVentas,
  ErrorsForms,
} from '@/types/operaciones';
import { ChangeEvent, useEffect, useState } from 'react';
import { tipoCilindros } from '@/arraysObjects/dataCilindros';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import {
  GEtTablaDescarga,
  GetTablaReportesDiarios,
  GetTablaVisualCarga,
  TablaCargaThunk,
  PostTablaVentas,
  GetTablaVentas,
} from '@/redux/slice/operaciones/thunks';
import { AutocompletableCamiones, AutocompletableConductores } from './desplegables';
import { RootState } from '@/redux/reducer';
import { getTablaConductores, tablaCamion } from '@/redux/slice/inventario/thunks';
import { RegistrarTablaDescarga } from '@/redux/slice/operaciones/thunks';
import Cookies from 'js-cookie';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { validate } from './validate';

const TablaCarga: React.FC<TablaCargaProps> = ({ estado, setEstado, setErrors }) => {
  const dispatch: AppDispatch = useDispatch();
  const response = useSelector((state: RootState) => state.operaciones.status);

  const [infoCilindros, setInfoCilindros] = useState<nameCilindro>({
    '5kg': { cantidad: '', cilindro: { id: '1', tipo: '5kg' } },
    '11kg': { cantidad: '', cilindro: { id: '2', tipo: '11kg' } },
    '15kg': { cantidad: '', cilindro: { id: '3', tipo: '15kg' } },
    '45kg': { cantidad: '', cilindro: { id: '4', tipo: '45kg' } },
    H15: { cantidad: '', cilindro: { id: '5', tipo: 'H15' } },
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

  const registrar = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const infoCilindrosArray = Object.entries(infoCilindros).map(([tipo, { cantidad, cilindro }]) => ({
      cantidad,
      cilindro: {
        id: cilindro.id,
        tipo: cilindro.tipo,
      },
    }));

    const token = Cookies.get('token');
    if (!token) return undefined;
    const decoded = jwt.decode(token) as JwtPayload | null;
    let empresaId = typeof decoded === 'object' && decoded !== null ? decoded.empresaId : undefined;
    const userId = typeof decoded === 'object' && decoded !== null ? decoded.id : undefined;
    if (!empresaId) empresaId = userId; // en caso de que empresaId no tenga nada, el id de la empresa se queda en userId

    const validationErrors = validate(estado);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const data = { ...estado, carga_cilindros: infoCilindrosArray, empresaId };
      await dispatch(TablaCargaThunk(data)); //envia la informacion para registrarla
      await dispatch(GetTablaReportesDiarios(empresaId)); //trae la informacion cada vez que se registra, esto para mstrarla en la tabla reportes diarios
    }
  };

  return (
    <>
      <h3 className="text-18px py-4 dark:text-textDark" id="tabla_carga">
        Tabla de Carga
      </h3>
      <div className="overflow-x-auto border-[1px] rounded-xl max-w-4xl dark:border-borderDarck">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-borderDarck">
          <thead className="bg-blanco dark:bg-bgDark1">
            <tr className="[&>*]:text-center [&>*]:py-4 [&>*]:text-xs [&>*]:text-14px  dark:text-textDark">
              <th className="px-6 py-3 text-left text-xs text-14px dark:text-textDark whitespace-nowrap">
                Tipo de cilindro
              </th>
              <th className="px-6 py-3 text-left text-xs text-14px dark:text-textDark whitespace-nowrap">
                Cantidad Cargada
              </th>
              <th className="px-6 py-3 text-left text-xs text-14px dark:text-textDark whitespace-nowrap">
                Observaciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-bgDark1 dark:divide-borderDarck">
            {tipoCilindros.map((row, index) => (
              <tr key={index} className="[&>*]:py-6 [&>*]:font-medium [&>*]:text-center">
                <td className="text-secondary-14px text-center dark:text-textDark">{row.tipo}</td>
                <td className="text-secondary-14px text-center">
                  <input
                    id={String(row.id)}
                    name={row.tipo}
                    value={infoCilindros[row.tipo]?.cantidad}
                    onChange={handleOnChange}
                    type="number"
                    className="w-16 sm:w-10 text-black overflow-hidden dark:bg-bgDark dark:text-textDark"
                    placeholder="0"
                  />
                </td>
                <td className="text-secondary-14px text-center">
                  <input
                    type="text"
                    className="w-48 movile:w-52 sm:ml-0 md:ml-12 text-black dark:bg-bgDark dark:text-textDark"
                    placeholder="Ingrese sus Observaciones"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <button
          onClick={(e) => registrar(e)}
          className="bg-azul dark:text-textDark  text-white max-w-xl rounded-xl w-full my-4 py-3 md:px-10 font-bold">
          {response === 'loading' ? 'Cargando...' : 'Registrar'}
        </button>
        <p className="font-mono text-[15px] text-red-500">{response === 'failed' ? 'Error en el servidor' : ''}</p>
      </div>
    </>
  );
};

const TablaDescarga: React.FC<TypeTablaDescarga> = ({ datosCarga, estado, setEstado }) => {
  const [form, setForm] = useState<Formulario>({
    '5kg': {
      Fallados: { estadoCilindroId: '3', tipoCilindroId: '1', cantidad: '' },
      Prestados: { estadoCilindroId: '4', tipoCilindroId: '1', cantidad: '' },
      Vacios: { estadoCilindroId: '2', tipoCilindroId: '1', cantidad: '' },
      Llenos: { estadoCilindroId: '1', tipoCilindroId: '1', cantidad: '' },
    },
    '11kg': {
      Fallados: { estadoCilindroId: '3', tipoCilindroId: '2', cantidad: '' },
      Prestados: { estadoCilindroId: '4', tipoCilindroId: '2', cantidad: '' },
      Vacios: { estadoCilindroId: '2', tipoCilindroId: '2', cantidad: '' },
      Llenos: { estadoCilindroId: '1', tipoCilindroId: '2', cantidad: '' },
    },
    '15kg': {
      Fallados: { estadoCilindroId: '3', tipoCilindroId: '3', cantidad: '' },
      Prestados: { estadoCilindroId: '4', tipoCilindroId: '3', cantidad: '' },
      Vacios: { estadoCilindroId: '2', tipoCilindroId: '3', cantidad: '' },
      Llenos: { estadoCilindroId: '1', tipoCilindroId: '3', cantidad: '' },
    },
    '45kg': {
      Fallados: { estadoCilindroId: '3', tipoCilindroId: '4', cantidad: '' },
      Prestados: { estadoCilindroId: '4', tipoCilindroId: '4', cantidad: '' },
      Vacios: { estadoCilindroId: '2', tipoCilindroId: '4', cantidad: '' },
      Llenos: { estadoCilindroId: '1', tipoCilindroId: '4', cantidad: '' },
    },
    H15: {
      Fallados: { estadoCilindroId: '3', tipoCilindroId: '5', cantidad: '' },
      Prestados: { estadoCilindroId: '4', tipoCilindroId: '5', cantidad: '' },
      Vacios: { estadoCilindroId: '2', tipoCilindroId: '5', cantidad: '' },
      Llenos: { estadoCilindroId: '1', tipoCilindroId: '5', cantidad: '' },
    },
  });
  const [registrar, setRegistrar] = useState(false);

  const dispatch: AppDispatch = useDispatch();

  const tablaDescarga = useSelector((state: RootState) => state.operaciones.responseTablaDescarga.result);

  useEffect(() => {
    if (tablaDescarga.length > 0) {
      setRegistrar(true);
    } else {
      setRegistrar(false);
    }
  }, [tablaDescarga]);

  const estadoTablas = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEstado({
      ...estado,
      openTablaDescarga: false,
      openTablaOperaciones: true,
      openTablaCarga: false,
    });
  };
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>, estado: { id: string; tipo: string }) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: {
        ...prevForm[name],
        [estado.tipo]: {
          ...prevForm[name][estado.tipo],
          cantidad: Number(value),
        },
      },
    }));
  };
  const registra = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const token = Cookies.get('token');
    if (!token) return undefined;
    const decoded = jwt.decode(token) as JwtPayload | null;
    let empresaId = typeof decoded === 'object' && decoded !== null ? decoded.empresaId : undefined;
    const userId = typeof decoded === 'object' && decoded !== null ? decoded.id : undefined;
    if (!empresaId) empresaId = userId; // en caso de que empresaId no tenga nada, el id de la empresa se queda en userId

    if (registrar === false) {
      setRegistrar(true); //si se registra informacion cambia de estado para que no pueda modificar

      const array = Object.entries(form).flatMap(([tipoCilindro, estados]) =>
        Object.entries(estados).map(([estadoCilindro, { estadoCilindroId, tipoCilindroId, cantidad }]) => ({
          tipoCilindro,
          estadoCilindro,
          estadoCilindroId,
          tipoCilindroId,
          cantidad,
        })),
      );
      const data: cargaDatosTablaDescarga = {
        carga_id: datosCarga.id,
        conductor: datosCarga.conductore,
        camion: datosCarga.camione,
        tablaDescarga: array,
        empresaId,
      };
      await dispatch(RegistrarTablaDescarga(data));
    }

    await dispatch(GEtTablaDescarga({ carga_id: datosCarga.id, empresaId })); //llamar a la base de datos para saber si hay cargas asociadas al id en la tabla descarga_camiones
  };

  return (
    <>
      <h3 className="text-18px py-4 dark:text-textDark" id="tabla_descarga">
        Tabla de Descarga
      </h3>
      <div className="overflow-x-auto dark:border-borderDarck border-[1px] rounded-xl max-w-4xl dark:bg-bgDark1">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-borderDarck">
          <thead>
            <tr className="[&>*]:text-center [&>*]:py-4  [&>*]:text-xs [&>*]:text-14px dark:text-textDark">
              {/* <th className='whitespace-nowrap' >Identificador Único de Carga</th> */}
              <th className="whitespace-nowrap px-6 py-2">Fecha</th>
              <th className="whitespace-nowrap px-6 py-2">Patente de Camión</th>
              <th className="whitespace-nowrap px-6 py-2">Nombre del Conductor</th>
              <th className="whitespace-nowrap px-6 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-bgDark1 dark:divide-borderDarck">
            <tr className="[&>*]:py-6 [&>*]:font-medium [&>*]:text-center">
              {/* <td className="px-6 py-4 font-Inter font-[400] text-[#121417] dark:text-textDark text-[14px]">
                {datosCarga.id}
              </td> */}
              <td className="px-6 py-4 font-Inter font-[400] text-[#121417] dark:text-textDark text-[14px]">
                {datosCarga.fecha}
              </td>
              <td className="px-6 py-4 font-Inter font-[400] text-[#121417] dark:text-textDark text-[14px]">
                {datosCarga.camione.placa}
              </td>
              <td className="px-6 py-4 font-Inter font-[400] text-[#121417] dark:text-textDark text-[14px]">
                {datosCarga.conductore.nombre}
              </td>
              <td className="px-6 py-4 font-Inter font-[400] text-[#121417] text-[14px]">
                <button
                  onClick={(e) => estadoTablas(e)}
                  className="bg-azul rounded-xl font-Inter font-[500] text-blanco py-1 px-2">
                  Cerrar
                </button>
              </td>
            </tr>
          </tbody>

          <thead className="bg-blanco dark:bg-bgDark1">
            <tr className="[&>*]:text-center [&>*]:py-4  [&>*]:text-xs [&>*]:text-14px dark:text-textDark">
              <th className="whitespace-nowrap px-6 py-2">Tipo de cilindro</th>
              <th className="whitespace-nowrap px-6 py-2">Cantidad de Fallados</th>
              <th className="whitespace-nowrap px-6 py-2">Cantidad prestados</th>
              <th className="whitespace-nowrap px-6 py-2">Cantidad Vacios</th>
              <th className="whitespace-nowrap px-6 py-2">Cantidad Llenos</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-bgDark1 dark:divide-borderDarck divide-y divide-gray-200">
            {registrar === false
              ? tipoCilindros.map((row) => (
                  <tr key={row.id} className="[&>*]:py-6 [&>*]:font-medium [&>*]:text-center">
                    <td className="text-secondary-14px text-center dark:text-textDark">{row.tipo}</td>
                    <td className="text-secondary-14px text-center">
                      <input
                        name={row.tipo}
                        value={form[row.tipo].Fallados.cantidad}
                        onChange={(e) => handleOnChange(e, { id: '3', tipo: 'Fallados' })}
                        type="number"
                        className="w-10 dark:text-textDark dark:bg-bgDark text-black overflow-hidden"
                        placeholder="0"
                      />
                    </td>
                    <td className="text-secondary-14px text-center">
                      <input
                        name={row.tipo}
                        value={form[row.tipo].Prestados.cantidad}
                        onChange={(e) => handleOnChange(e, { id: '4', tipo: 'Prestados' })}
                        type="number"
                        className="w-10 dark:text-textDark dark:bg-bgDark text-black overflow-hidden"
                        placeholder="0"
                      />
                    </td>
                    <td className="text-secondary-14px text-center">
                      <input
                        name={row.tipo}
                        value={form[row.tipo].Vacios.cantidad}
                        onChange={(e) => handleOnChange(e, { id: '2', tipo: 'Vacios' })}
                        type="number"
                        className="w-10 dark:text-textDark dark:bg-bgDark text-black overflow-hidden"
                        placeholder="0"
                      />
                    </td>
                    <td className="text-secondary-14px text-center">
                      <input
                        name={row.tipo}
                        value={form[row.tipo].Llenos.cantidad}
                        onChange={(e) => handleOnChange(e, { id: '1', tipo: 'Llenos' })}
                        type="number"
                        className="w-10 dark:text-textDark dark:bg-bgDark text-black overflow-hidden"
                        placeholder="0"
                      />
                    </td>
                  </tr>
                ))
              : tablaDescarga?.map((info, i) => (
                  <tr key={i} className="[&>*]:py-6 [&>*]:font-medium [&>*]:text-center ">
                    <td className="text-secondary-14px text-center  dark:text-textDark"> {info.tipo}</td>
                    <td className="text-secondary-14px text-center dark:text-textDark">{info.fallados}</td>
                    <td className="text-secondary-14px text-center dark:text-textDark">{info.prestados}</td>
                    <td className="text-secondary-14px text-center dark:text-textDark">{info.vacíos}</td>
                    <td className="text-secondary-14px text-center dark:text-textDark">{info.llenos}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={(e) => registra(e)}
        className={`${!registrar ? 'block' : 'hidden'} bg-blue-400  text-white max-w-xl rounded-xl w-full my-4 py-3 md:px-10 font-bold`}>
        Registrar
      </button>
    </>
  );
};

const TablaOperaciones: React.FC<TablaReportesDiarias> = ({ infoCarga, tabla, estado, setEstado }) => {
  const textTable = ['Fecha', 'Número de patente', 'Nombre del Conductor', 'Acciones'];
  const dispatch: AppDispatch = useDispatch();
  const tabla1 = useSelector((state: RootState) => state.operaciones.responseTablaReportesDiarios.result);

  const token = Cookies.get('token');
  if (!token) return undefined;
  const decoded = jwt.decode(token) as JwtPayload | null;
  let empresaId = typeof decoded === 'object' && decoded !== null ? decoded.empresaId : undefined;
  const userId = typeof decoded === 'object' && decoded !== null ? decoded.id : undefined;
  if (!empresaId) empresaId = userId; // en caso de que empresaId no tenga nada, el id de la empresa se queda en userId

  const estadoTablaVentas = (e: React.MouseEvent<HTMLButtonElement>, carga: InfoReportesDiarios) => {
    e.preventDefault();
    //llamar a la base de datos para saber si hay cargas asociadas al id en la tabla descarga_camiones
    dispatch(GetTablaVisualCarga({ carga_id: carga.id, empresaId }));
    dispatch(GetTablaVentas({ carga_id: carga.id, empresaId }));

    infoCarga.setCarga({
      ...infoCarga.carga,
      id: carga.id,
      fecha: carga.fecha,
      camione: carga.camione,
      conductore: carga.conductore,
      hora: carga.hora,
    });

    setEstado({
      ...estado,
      openTablaOperaciones: false,
      openTablaDescarga: false,
      openTablaCarga: false,
      openTablaVentas: true,
    });
  };

  const estadoTablaDescarga = (e: React.MouseEvent<HTMLButtonElement>, carga: InfoReportesDiarios) => {
    e.preventDefault();

    //llamar a la base de datos para saber si hay cargas asociadas al id en la tabla descarga_camiones
    dispatch(GEtTablaDescarga({ carga_id: carga.id, empresaId }));

    infoCarga.setCarga({
      ...infoCarga.carga,
      id: carga.id,
      fecha: carga.fecha,
      camione: carga.camione,
      conductore: carga.conductore,
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

    dispatch(GetTablaVisualCarga({ carga_id: carga.id, empresaId }));

    infoCarga.setCarga({
      ...infoCarga.carga,
      id: carga.id,
      fecha: carga.fecha,
      camione: carga.camione,
      conductore: carga.conductore,
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
      <h1 className="text-18px py-6 dark:text-textDark" id="resumen_reportes_diarios">
        Resumen de Reportes Diarios
      </h1>
      <div className="overflow-x-auto border-[1px] rounded-xl dark:border-borderDarck">
        <table className="min-w-full divide-y dark:divide-borderDarck divide-gray-200">
          <thead className="bg-blanco dark:bg-bgDark1">
            <tr>
              {textTable.map((item) => (
                <th key={item} className="px-10 py-3 text-left text-xs text-14px dark:text-textDark whitespace-nowrap">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          {tabla1.length ? (
            <tbody className="bg-white dark:bg-bgDark1 dark:divide-borderDarck divide-y divide-gray-200">
              {tabla1?.map((item) => (
                <tr key={item.id}>
                  {/* <td className="px-6 py-4 text-secondary-14px dark:text-textDark">{item.id}</td> */}
                  <td className="px-10 py-4 text-secondary-14px dark:text-textDark">{item.fecha}</td>
                  <td className="px-10 py-4 text-secondary-14px dark:text-textDark">{item.camione.placa}</td>
                  <td className="px-10 py-4 text-secondary-14px dark:text-textDark">{item.conductore.nombre}</td>
                  <td className="px-10 py-4 text-secondary-14px flex flex-col">
                    <button
                      onClick={(e) => estadoTablaDescarga(e, item)}
                      className="text-start underline whitespace-nowrap">
                      Abrir Tabla de Descarga
                    </button>
                    <button
                      onClick={(e) => estadoTablacarga(e, item)}
                      className="text-start underline whitespace-nowrap">
                      Abrir Tabla de Carga
                    </button>
                    <button
                      className="text-start underline whitespace-nowrap"
                      onClick={(e) => estadoTablaVentas(e, item)}>
                      Abrir Tabla de Ventas
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody className="bg-white dark:bg-bgDark1">
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center align-middle text-secondary-14px dark:text-textDark">
                  No hay datos disponibles
                </td>
              </tr>
            </tbody>
          )}
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
      <h3 className="text-18px py-4 dark:text-textDark" id="tabla_carga">
        Tabla visual de Carga
      </h3>
      <div className="overflow-x-auto border-[1px] dark:bg-bgDark1 rounded-xl max-w-4xl dark:border-borderDarck">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-borderDarck">
          <thead>
            <tr className="[&>*]:text-center [&>*]:py-4  [&>*]:text-xs [&>*]:text-14px dark:text-textDark">
              <th className="px-6 py-4 whitespace-nowrap">Identificador Único de Carga</th>
              <th className="px-6 py-4 whitespace-nowrap">Fecha</th>
              <th className="px-6 py-4 whitespace-nowrap">Patente de Camión</th>
              <th className="px-6 py-4 whitespace-nowrap">Nombre del Conductor</th>
              <th className="px-6 py-4 whitespace-nowrap">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-bgDark1 divide-y divide-gray-200">
            <tr className="[&>*]:py-6 [&>*]:font-medium [&>*]:text-center">
              <td className="px-6 py-4 font-Inter font-[400] text-[#121417] dark:text-textDark text-[14px] whitespace-nowrap">
                {carga.id}
              </td>
              <td className="px-6 py-4 font-Inter font-[400] text-[#121417] dark:text-textDark text-[14px] whitespace-nowrap">
                {carga.fecha}
              </td>
              <td className="px-6 py-4 font-Inter font-[400] text-[#121417] dark:text-textDark text-[14px] whitespace-nowrap">
                {carga.camione.placa}
              </td>
              <td className="px-6 py-4 font-Inter font-[400] text-[#121417] dark:text-textDark text-[14px] whitespace-nowrap">
                {carga.conductore.nombre}
              </td>
              <td className="px-6 py-4 font-Inter font-[400] text-[#121417] dark:text-textDark text-[14px] whitespace-nowrap">
                <button
                  onClick={(e) => estadoTablas(e)}
                  className="bg-azul dark:text-textDark rounded-xl font-Inter font-[500] text-blanco py-1 px-2">
                  Cerrar
                </button>
              </td>
            </tr>
          </tbody>
          <thead className="bg-blanco dark:bg-bgDark1">
            <tr className="[&>*]:text-center [&>*]:py-4  [&>*]:text-xs [&>*]:text-14px dark:text-textDark">
              <th>Tipo de cilindro</th>
              <th>Cantidad Cargada</th>
              <th>Observaciones</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-bgDark1 divide-y dark:divide-borderDarck divide-gray-200">
            {infoTablaVisual.map((row, index) => (
              <tr key={index} className="[&>*]:py-6 [&>*]:font-medium [&>*]:text-center">
                <td className="text-secondary-14px text-center dark:text-textDark">{row.tipo_cilindro.tipo}</td>
                <td className="text-secondary-14px text-center dark:text-textDark">{row.cantidad}</td>
                <td className="text-secondary-14px text-center dark:text-textDark"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const TablaVentas: React.FC<TypeTablaVisualCarga> = ({ carga, estado, setEstado }) => {
  const dispatch: AppDispatch = useDispatch();
  const TablaVentas = useSelector((state: RootState) => state.operaciones.responseTablaVentas.result);
  const [form, setForm] = useState<formularioVentas>({
    '5kg': { tipoCilindroId: '', cantidad: '', valor: '' },
    '11kg': { tipoCilindroId: '', cantidad: '', valor: '' },
    '15kg': { tipoCilindroId: '', cantidad: '', valor: '' },
    '45kg': { tipoCilindroId: '', cantidad: '', valor: '' },
    H15: { tipoCilindroId: '', cantidad: '', valor: '' },
  });
  const [registrarData, setRegistrarData] = useState(false);

  const estadoTablas = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEstado({
      ...estado,
      openTablaCarga: false,
      openTablaDescarga: false,
      openTablaOperaciones: true,
      openTablaVentas: false,
    });
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>, field: 'cantidad' | 'valor', id: string) => {
    const { value, name } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name as keyof formularioVentas]: {
        ...prevForm[name as keyof formularioVentas],
        [field]: value,
        tipoCilindroId: id,
      },
    }));
  };

  const registrar = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const token = Cookies.get('token');
    if (!token) return undefined;
    const decoded = jwt.decode(token) as JwtPayload | null;
    let empresaId = typeof decoded === 'object' && decoded !== null ? decoded.empresaId : undefined;
    const userId = typeof decoded === 'object' && decoded !== null ? decoded.id : undefined;
    if (!empresaId) empresaId = userId; // en caso de que empresaId no tenga nada, el id de la empresa se queda en userId

    const array = Object.entries(form).map(([key, value]) => ({
      tipo: key,
      ...value,
    }));

    const data: cargaDatosVentas = {
      carga_id: carga.id,
      conductor: carga.conductore,
      camion: carga.camione,
      tabla: array,
      empresaId,
    };

    await dispatch(PostTablaVentas(data));
    await dispatch(GetTablaVentas({ carga_id: carga.id, empresaId }));
  };

  useEffect(() => {
    if (TablaVentas.length > 0) {
      setRegistrarData(true);
    } else {
      setRegistrarData(false);
    }
  }, [TablaVentas]);

  return (
    <>
      <h3 className="text-18px py-4 dark:text-textDark" id="tabla_carga">
        Tabla de Ventas
      </h3>
      <div className="overflow-x-auto border-[1px] dark:bg-bgDark1 dark:border-borderDarck rounded-xl max-w-4xl ">
        <table className="min-w-full divide-y dark:divide-borderDarck divide-gray-200 ">
          <thead>
            <tr className="[&>*]:text-center [&>*]:py-4  [&>*]:text-xs [&>*]:text-14px dark:text-textDark">
              <th className="px-6 py-4 whitespace-nowrap">Identificador Único de Carga</th>
              <th className="px-6 py-4 whitespace-nowrap">Fecha</th>
              <th className="px-6 py-4 whitespace-nowrap">Patente de Camión</th>
              <th className="px-6 py-4 whitespace-nowrap">Nombre del Conductor</th>
              <th className="px-6 py-4 whitespace-nowrap">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-bgDark1 divide-y divide-gray-200">
            <tr className="[&>*]:py-6 [&>*]:font-medium [&>*]:text-center">
              <td className="px-6 py-4 font-Inter font-[400] text-[#121417] dark:text-textDark text-[14px]">
                {carga.id}
              </td>
              <td className="px-6 py-4 font-Inter font-[400] text-[#121417] dark:text-textDark text-[14px] whitespace-nowrap">
                {carga.fecha}
              </td>
              <td className="px-6 py-4 font-Inter font-[400] text-[#121417] dark:text-textDark text-[14px] whitespace-nowrap">
                {carga.camione.placa}
              </td>
              <td className="px-6 py-4 font-Inter font-[400] text-[#121417] dark:text-textDark text-[14px] whitespace-nowrap">
                {carga.conductore.nombre}
              </td>
              <td className="px-6 py-4 font-Inter font-[400] text-[#121417] dark:text-textDark text-[14px] whitespace-nowrap">
                <button
                  onClick={(e) => estadoTablas(e)}
                  className="bg-azul dark:text-textDark rounded-xl font-Inter font-[500] text-blanco py-1 px-2">
                  Cerrar
                </button>
              </td>
            </tr>
          </tbody>
          <thead className="bg-blanco dark:bg-bgDark1">
            <tr className="[&>*]:text-center [&>*]:py-4  [&>*]:text-xs [&>*]:text-14px dark:text-textDark">
              <th>Tipo de cilindro</th>
              <th>Cantidad</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-bgDark1 dark:divide-borderDarck divide-y divide-gray-200">
            {registrarData === false
              ? tipoCilindros.map((row, index) => (
                  <tr key={index} className="[&>*]:py-6 [&>*]:font-medium [&>*]:text-center">
                    <td className="text-secondary-14px text-center dark:text-textDark">{row.tipo}</td>
                    <td className="text-secondary-14px text-center">
                      <input
                        name={row.tipo}
                        value={form[row.tipo].cantidad}
                        onChange={(e) => handleOnChange(e, 'cantidad', String(row.id))}
                        type="number"
                        className="w-10  dark:text-textDark dark:bg-bgDark text-black overflow-hidden"
                        placeholder="0"
                      />
                    </td>
                    <td className="text-secondary-14px text-center">
                      <input
                        name={row.tipo}
                        value={form[row.tipo].valor}
                        onChange={(e) => handleOnChange(e, 'valor', String(row.id))}
                        type="text"
                        className="w-14 dark:text-textDark dark:bg-bgDark text-black overflow-hidden"
                        placeholder="0"
                      />
                    </td>
                  </tr>
                ))
              : TablaVentas?.map((row, index) => (
                  <tr key={index} className="[&>*]:py-6 [&>*]:font-medium [&>*]:text-center">
                    <td className="text-secondary-14px text-center dark:text-textDark">{row.tipoCilindro.tipo}</td>
                    <td className="text-secondary-14px text-center dark:text-textDark">{row.cantidad}</td>
                    <td className="text-secondary-14px text-center dark:text-textDark">{row.valor}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={(e) => registrar(e)}
        className={`${!registrarData ? 'block' : 'hidden'} bg-blue-400  text-white max-w-xl rounded-xl w-full my-4 py-3 md:px-10 font-bold`}>
        Registrar
      </button>
    </>
  );
};

export default function SectionsOperacion() {
  const dispatch: AppDispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);
  const [errors, setErrors] = useState<ErrorsForms>({});

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
    openTablaVentas: false,
  });
  //formulario de tabla de carga
  const [form, setForm] = useState<CargaDatos>({
    numero_movil: { id: '', placa: '' },
    nombre_conductor: { id: '', nombre: '' },
    carga_cilindros: [],
    empresaId: '',
  });
  //carga, se mostrara en la tablaDescargas
  const [carga, setCarga] = useState<InfoReportesDiarios>({
    id: '',
    fecha: '',
    camione: { id: '', placa: '' },
    conductore: { id: '', nombre: '' },
    hora: '',
  });

  const infoCarga: EstadoCarga = {
    carga,
    setCarga,
  };

  useEffect(() => {
    setIsClient(true);

    const token = Cookies.get('token');
    if (!token) return undefined;
    const decoded = jwt.decode(token) as JwtPayload | null;
    let empresaId = typeof decoded === 'object' && decoded !== null ? decoded.empresaId : undefined;
    const userId = typeof decoded === 'object' && decoded !== null ? decoded.id : undefined;
    if (!empresaId) empresaId = userId; // en caso de que empresaId no tenga nada, el id de la empresa se queda en userId

    dispatch(getTablaConductores(empresaId));
    dispatch(tablaCamion(empresaId));
    dispatch(GetTablaReportesDiarios(empresaId));
  }, [dispatch]);

  return (
    <div className="p-2 movile:p-4 w-full">
      <h3 className="text-18px py-4 dark:text-textDark">Operaciones</h3>

      <div className="flex flex-col gap-5 ">
        <label>
          <p className="text-16px  py-2 dark:text-textDark">Número de patente</p>
          <div>
            <AutocompletableCamiones
              camiones={camiones}
              form={form}
              setForm={setForm}
              name="numero_movil"
              placeholder="asdf236"
            />
            <p className="font-mono text-[15px] text-red-500">{errors.numero_movil}</p>
          </div>
        </label>

        <label>
          <p className="text-16px py-2 dark:text-textDark">Nombre conductor</p>
          <div>
            <AutocompletableConductores
              conductores={conductores}
              placeholder="Juan Carlos Lopez"
              name="nombre_conductor"
              form={form}
              setForm={setForm}
            />
            <p className="font-mono text-[15px] text-red-500">{errors.nombre_conductor}</p>
          </div>
        </label>
      </div>
      <TablaCarga estado={form} setEstado={setForm} setErrors={setErrors} />
      {isClient && openTablaOperaciones.openTablaDescarga && (
        <TablaDescarga datosCarga={carga} estado={openTablaOperaciones} setEstado={setOpenTablaOperaciones} />
      )}
      {isClient && openTablaOperaciones.openTablaCarga && (
        <TablaVisualCarga carga={carga} estado={openTablaOperaciones} setEstado={setOpenTablaOperaciones} />
      )}
      {isClient && openTablaOperaciones.openTablaOperaciones && (
        <TablaOperaciones
          infoCarga={infoCarga}
          tabla={TablaOperacionesDiarias}
          estado={openTablaOperaciones}
          setEstado={setOpenTablaOperaciones}
        />
      )}
      {isClient && openTablaOperaciones.openTablaVentas && (
        <TablaVentas carga={carga} estado={openTablaOperaciones} setEstado={setOpenTablaOperaciones} />
      )}
    </div>
  );
}
