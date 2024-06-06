import { Actividad } from '@/types/actividad_reciente';

const Tabla = () => {
  const actividades: Actividad[] = [
  { fecha: '6/06/2024', idConductor: '54lkmm5879ñ', kg5: 5, kg11: 10, kg15: 0, kg45: 35, h15: 4, total: 54, operaciones: 'carga' },
  { fecha: '01/01/2023', idConductor: '23adlkjsd91', kg5: 10, kg11: 0, kg15: 5, kg45: 20, h15: 0, total: 35, operaciones: 'carga' },
  { fecha: '02/01/2023', idConductor: '47djasd881', kg5: 0, kg11: 20, kg15: 10, kg45: 0, h15: 5, total: 35, operaciones: 'retorno' },
  { fecha: '03/01/2023', idConductor: '54lkmm5879ñ', kg5: 15, kg11: 5, kg15: 10, kg45: 0, h15: 0, total: 30, operaciones: 'carga' },
  { fecha: '04/01/2023', idConductor: '67aafgjsd12', kg5: 20, kg11: 0, kg15: 0, kg45: 10, h15: 0, total: 30, operaciones: 'retorno' },
];

  return (
    <div className="overflow-x-auto border-[1px] rounded-xl">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-blanco">
          <tr className="[&>*]:px-6 [&>*]:py-3  [&>*]:text-xs [&>*]:text-14px">
            <th className="text-left">Fecha</th>
            <th className="text-left">Id Conductor</th>
            <th className="text-center">kg5</th>
            <th className="text-center">kg11</th>
            <th className="text-center">kg15</th>
            <th className="text-center">kg45</th>
            <th className="text-center">h15</th>
            <th className="text-center">Total</th>
            <th className="text-center">Operaciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {actividades.map((row, index) => (
            <tr key={index} className="[&>*]:py-4">
              <td className="px-6 py-4 text-14px text-secondary-14px">{row.fecha}</td>
              <td className="px-6 py-4 text-14px">{row.idConductor}</td>
              <td className="px-6 py-4 text-14px">{row.kg5}</td>
              <td className="px-6 py-4 text-14px">{row.kg11}</td>
              <td className="px-6 py-4 text-14px">{row.kg15}</td>
              <td className="px-6 py-4 text-14px">{row.kg45}</td>
              <td className="px-6 py-4 text-14px">{row.h15}</td>
              <td className="px-6 py-4 text-14px">{row.total}</td>
              <td className="border-b text-center  py-2">
                <div className="flex justify-center">
                  <p className=" text-center  px-14 py-1 rounded-xl text-16px bg-gris-1 max-w-40  ">
                    {row.operaciones}
                  </p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function Actividades_recientes() {
  return (
    <div className="bg-blanco px-4 py-6 w-full">
      <h1 className="text-18px">Actividades Recientes</h1>
      <div className="py-5">
        <Tabla />
      </div>
    </div>
  );
}
