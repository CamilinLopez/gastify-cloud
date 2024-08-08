'use client';

import { InfoInventarioCamiones, TipoCilindro, TypeShowTalbas } from '@/types/inventario_camiones';
import { ChangeEvent, FocusEvent, useState } from 'react';

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
  const [idMovimiento, setIdMovimiento] = useState<string>('');
  const [showTabla1, setShowTabla1] = useState<boolean>(true);

  const [numeroMovil, setNumeroMovil] = useState<string>('');
  const [idConductor, setIdConductor] = useState<string>('');
  const [fecha, setFecha] = useState<string>('');
  const [hora, setHora] = useState<string>('');

  const [numeroMovilError, setNumeroMovilError] = useState<boolean>(false);
  const [idConductorError, setIdConductorError] = useState<boolean>(false);
  const [fechaError, setFechaError] = useState<boolean>(false);
  const [horaError, setHoraError] = useState<boolean>(false);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'numeroMovil') setNumeroMovil(value);
    if (name === 'idConductor') setIdConductor(value);
    if (name === 'fecha') setFecha(value);
    if (name === 'hora') setHora(value);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    if (name === 'numeroMovil' && !numeroMovil) setNumeroMovilError(true);
    if (name === 'idConductor' && !idConductor) setIdConductorError(true);
    if (name === 'fecha' && !fecha) setFechaError(true);
    if (name === 'hora' && !hora) setHoraError(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hasError = !numeroMovil || !idConductor || !fecha || !hora;

    if (!numeroMovil) setNumeroMovilError(true);
    if (!idConductor) setIdConductorError(true);
    if (!fecha) setFechaError(true);
    if (!hora) setHoraError(true);

    if (hasError) return;
  };

  return (
    <div className="p-4 w-full">
      <h3 className="text-18px py-4" id="inventario_camiones">
        Inventario En Camiones
      </h3>

      <form className="text-16px max-w-2xl" onSubmit={handleSubmit}>
        <div className="flex gap-2 flex-wrap">
          <label>
            <p className="text-16px py-2">Número de Movil</p>
            <div>
              <input
                type="text"
                name="numeroMovil"
                className={`p-4 h-14 rounded-xl w-[15rem]  border ${numeroMovilError ? 'border-red-500' : 'bg-gris-1'}`}
                value={numeroMovil}
                onChange={handleOnChange}
                onBlur={handleBlur}
                placeholder="Número de Movil"
              />
            </div>
            {numeroMovilError && <p className="text-red-500 text-xs">*falta Agregar El número de movil*</p>}
          </label>

          <label>
            <p className="text-16px py-2">ID conductor</p>
            <div>
              <input
                type="text"
                name="idConductor"
                className={`p-4 h-14 rounded-xl w-[15rem] border ${idConductorError ? 'border-red-500' : 'bg-gris-1'}`}
                value={idConductor}
                onChange={handleOnChange}
                onBlur={handleBlur}
                placeholder="ID conductor"
              />
            </div>
            {idConductorError && <p className="text-red-500 text-xs">*falta Agregar El ID del conductor*</p>}
          </label>

          <label>
            <p className="text-16px py-2">Fecha</p>
            <div>
              <input
                type="date"
                name="fecha"
                className={`p-4 h-14  rounded-xl  w-[15rem] border ${fechaError ? 'border-red-500' : 'bg-gris-1'}`}
                value={fecha}
                onChange={handleOnChange}
                onBlur={handleBlur}
              />
            </div>
            {fechaError && <p className="text-red-500 text-xs">*falta Agregar La Fecha*</p>}
          </label>

          <label>
            <p className="text-16px py-2">Hora</p>
            <div>
              <input
                type="text"
                name="hora"
                className={`p-4 h-14 rounded-xl w-[15rem] border ${horaError ? 'border-red-500' : 'bg-gris-1'}`}
                value={hora}
                onChange={handleOnChange}
                onBlur={handleBlur}
                placeholder="Hora"
              />
              {horaError && <p className="text-red-500 text-xs">*falta Agregar La Hora*</p>}
            </div>
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-400 text-white max-w-sm rounded-xl w-full my-4 py-3 md:px-10 font-bold">
          Buscar
        </button>
      </form>
      <div className="py-3">{showTabla1 ? <Tabla1 SetIdMovimiento={setIdMovimiento} /> : <Tabla2 />}</div>
    </div>
  );
}
