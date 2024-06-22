import { DiferentesCilindros } from '@/types/diferentes_cilindros';

const Tabla = () => {
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
      tipoCilindro: '45kg'
    },
    {
      tipoCilindro: 'H15'
    },
  ];

  return (
    <><div className="overflow-x-auto border-[1px] rounded-xl max-w-4xl ">
      <table className="min-w-full divide-y divide-gray-200 ">
        <thead className="bg-blanco">
          <tr className="[&>*]:text-center [&>*]:py-4  [&>*]:text-xs [&>*]:text-14px">
            <th>Tipo de cilindro</th>
            <th>Cantidad Cargada</th>
            <th>Observaciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr key={index} className="[&>*]:py-6 [&>*]:font-medium [&>*]:text-center ">
              <td className="text-secondary-14px text-center">{row.tipoCilindro}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
      <button className="bg-blue-400  text-white max-w-xl rounded-xl w-full my-4 py-3 md:px-10 font-bold">
        Registrar
      </button></>
  );
};

export default function SectionsOperacion() {
  return (
    <div className="p-4  w-full">
      <h3 className="text-18px py-4">Operaciones</h3>

      <div className="flex flex-col gap-5 ">
        <label>
          <p className="text-16px py-2 ">Fecha de Operación</p>
          <div>
            <input
              type="string"
              className="border  pl-4 bg-gris-1  rounded-xl py-3   text-gris-2"
              placeholder="Fecha de Operación"
            />
          </div>
        </label>

        <label>
          <p className="text-16px py-2 ">Número de movil</p>
          <div>
            <input
              type="text"
              className="border pl-4  bg-gris-1 rounded-xl py-3  text-gris-2"
              placeholder="Número de movil"
            />
          </div>
        </label>

        <label>
          <p className="text-16px py-2 ">ID conductor</p>
          <div>
            <input
              type="text"
              className="border pl-4  bg-gris-1 rounded-xl py-3  text-gris-2"
              placeholder="ID conductor"
            />
          </div>
        </label>
      </div>

      <h3 className="text-18px py-4">Tabla de Carga</h3>
      <Tabla />
      <h3 className="text-18px py-4">Tabla de Descarga</h3>
      <Tabla />
    </div>
  );
}
