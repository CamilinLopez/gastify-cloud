import { InfoMovimientosDiarios } from "@/types/movimientos_diarios";

const Tabla = () => {
  const data: InfoMovimientosDiarios[] = [
  { tipoCilindro: '5 kg', Llenos: 200, Vacios: 50, Fallados: 10, Prestados: 5, FechadeMovimientos: '2023-07-01', IDResponsable: 123 },
  { tipoCilindro: '11 kg', Llenos: 300, Vacios: 75, Fallados: 15, Prestados: 10, FechadeMovimientos: '2023-07-02', IDResponsable: 124 },
  { tipoCilindro: '15 kg', Llenos: 400, Vacios: 100, Fallados: 20, Prestados: 15, FechadeMovimientos: '2023-07-03', IDResponsable: 125 },
  { tipoCilindro: '45 kg', Llenos: 500, Vacios: 125, Fallados: 25, Prestados: 20, FechadeMovimientos: '2023-07-04', IDResponsable: 126 },
  { tipoCilindro: 'H15', Llenos: 600, Vacios: 150, Fallados: 30, Prestados: 25, FechadeMovimientos: '2023-07-05', IDResponsable: 127 }
];

  return (
    <div className="overflow-x-auto border-[1px] rounded-xl max-w-4xl ">
      <table className="min-w-full divide-y divide-gray-200 ">
        <thead className="bg-blanco">
          <tr className="[&>*]:px-6 [&>*]:py-3  [&>*]:text-xs [&>*]:text-14px">
            <th className="text-left ">Tipo de cilindro</th>
            <th className="text-left">Llenos</th>
            <th className="text-left">Vacios</th>
            <th className="text-left">Fallados</th>
            <th className="text-left">Prestados</th>
            <th className="text-left">Fecha de Movimientos</th>
            <th className="text-left">ID Responsable</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr key={index} className="[&>*]:py-4 [&>*]:px-6 ">
              <td className="text-14px">{row.tipoCilindro}</td>
              <td className="text-secondary-14px">{row.Llenos}</td>
              <td className="text-secondary-14px">{row.Vacios}</td>
              <td className="text-secondary-14px">{row.Fallados}</td>
              <td className="text-secondary-14px">{row.Prestados}</td>
              <td className="text-secondary-14px">{row.FechadeMovimientos}</td>
              <td className="text-secondary-14px">{row.IDResponsable}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default function MovimientosDiarios() {
  return (
    <div className="p-4 w-full">
      <h2 className="text-18px py-4">Movimientos Diarios</h2>
      <h3 className="text-18px">Filtros</h3>
      <label className="text-16px">
        <p className="text-16px">Buscar por fecha</p>
        <input
          type="string"
          className="border bg-gris-1 rounded-xl py-4 pr-24 md:pr-28 text-gris-2"
          placeholder="Seleccionar fecha"
        />
      </label>

      <label className="text-16px">
        <p className="text-16px">ID Representante</p>
        <input
          type="text"
          className="border bg-gris-1 rounded-xl py-4 pr-24 md:pr-28 text-gris-2"
          placeholder="Ingresar ID"
        />
      </label>

      <div className="py-5">
        <Tabla />
      </div>
    </div>
  );
}
