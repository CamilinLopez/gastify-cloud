import { InfoInventarioBodega } from '@/types/inventario_bodegas';

const Tabla = () => {
  const data: InfoInventarioBodega[] = [
    {
      fecha: '01-01-2023',
      hora: '10:00',
      tipoCilindro: 123,
      Llenos: 100,
      Vacios: 200,
      Fallados: 300,
      Prestados: 400,
    },
    {
      fecha: '02-01-2023',
      hora: '10:00',
      tipoCilindro: 46,
      Llenos: 150,
      Vacios: 250,
      Fallados: 350,
      Prestados: 10,
    },
    {
      fecha: '03-01-2023',
      hora: '10:00',
      tipoCilindro: 789,
      Llenos: 120,
      Vacios: 220,
      Fallados: 320,
      Prestados: 15,
    },
    {
      fecha: '04-01-2023',
      hora: '10:00',
      tipoCilindro: 12,
      Llenos: 130,
      Vacios: 230,
      Fallados: 330,
      Prestados: 20,
    },
    {
      fecha: '05-01-2023',
      hora: '10:00',
      tipoCilindro: 345,
      Llenos: 140,
      Vacios: 240,
      Fallados: 340,
      Prestados: 25,
    },
  ];

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
              <td className="text-secondary-14px text-center">{row.tipoCilindro}</td>
              <td className="text-secondary-14px">{row.Llenos}</td>
              <td className="text-secondary-14px">{row.Vacios}</td>
              <td className="text-secondary-14px ">{row.Fallados}</td>
              <td className="text-secondary-14px text-center">{row.Prestados}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function InventarioBodega() {
  return (
    <div className="p-4 w-full">
      <h3 className="text-18px py-4 " id='inventario_bodegas'>Inventario de Bodega</h3>

      <p className="text-18px">Buscar Por Fecha y Hora</p>

      <form className=" [&>*]:text-16px">
        <div className="flex gap-5 ">
          <label>
            <p className="text-16px py-2 ">Fecha</p>
            <div>
              <input
                type="string"
                className="border  pl-4 bg-gris-1  rounded-xl py-3   text-gris-2"
                placeholder="Fecha"
              />
            </div>
          </label>

          <label>
            <p className="text-16px py-2 ">Hora</p>
            <div className="max-w-52">
              <input type="text" className="border pl-4  bg-gris-1 rounded-xl py-3  text-gris-2" placeholder="Hora" />
            </div>
          </label>
        </div>
        <button className="bg-blue-400  text-white max-w-xl rounded-xl w-full my-4 py-3 md:px-10 font-bold">
          Buscar
        </button>
      </form>

      <div className="py-3">
        <Tabla />
      </div>
    </div>
  );
}
