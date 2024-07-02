import { InfoInventarioCamiones } from '@/types/inventario_camiones';

const Tabla = () => {
  const data: InfoInventarioCamiones[] = [
    {
      fecha: '01-01-2023',
      hora: '10:00',
      numeroMovil: 123,
      IDdelConductor: 100,
      tipoCilindro: 200,
      Llenos: 300,
      Vacios: 400,
      Fallados: 500,
    },
    {
      fecha: '02-01-2023',
      hora: '10:00',
      numeroMovil: 456,
      IDdelConductor: 150,
      tipoCilindro: 250,
      Llenos: 350,
      Vacios: 450,
      Fallados: 550,
    },
    {
      fecha: '03-01-2023',
      hora: '10:00',
      numeroMovil: 789,
      IDdelConductor: 120,
      tipoCilindro: 220,
      Llenos: 320,
      Vacios: 420,
      Fallados: 520,
    },
    {
      fecha: '04-01-2023',
      hora: '10:00',
      numeroMovil: 12,
      IDdelConductor: 130,
      tipoCilindro: 230,
      Llenos: 330,
      Vacios: 430,
      Fallados: 530,
    },
    {
      fecha: '05-01-2023',
      hora: '10:00',
      numeroMovil: 345,
      IDdelConductor: 140,
      tipoCilindro: 240,
      Llenos: 340,
      Vacios: 440,
      Fallados: 540,
    },
  ];

  return (
    <div className="overflow-x-auto border-[1px] rounded-xl max-w-4xl ">
      <table className="min-w-full divide-y divide-gray-200 ">
        <thead className="bg-blanco">
          <tr className="[&>*]:text-center [&>*]:py-4  [&>*]:text-xs [&>*]:text-14px">
            <th>Fecha</th>
            <th>Hora</th>
            <th>Numero de Movil</th>
            <th>ID del conductor</th>
            <th>Tipo de cilindro</th>
            <th>Llenos</th>
            <th>Vacios</th>
            <th>Fallados</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr key={index} className="[&>*]:py-6 [&>*]:font-medium [&>*]:text-center ">
              <td className="text-14px">{row.fecha}</td>
              <td className="text-14px">{row.hora}</td>
              <td className="text-secondary-14px text-center">{row.numeroMovil}</td>
              <td className="text-secondary-14px text-center">{row.IDdelConductor}</td>
              <td className="text-secondary-14px text-center">{row.tipoCilindro}</td>
              <td className="text-secondary-14px">{row.Llenos}</td>
              <td className="text-secondary-14px">{row.Vacios}</td>
              <td className="text-secondary-14px ">{row.Fallados}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function InventarioCamiones() {
  return (
    <div className="p-4 w-full">
      <h3 className="text-18px py-4 " id="inventario_camiones">
        Inventario En Camiones
      </h3>

      <form className="text-16px">
        <div className="flex gap-5 flex-wrap max-w-xl">
          <label>
            <p className="text-16px py-2 ">Numero de Movil</p>
            <div>
              <input type="string" className="border pl-4 bg-gris-1 rounded-xl py-3 text-gris-2" placeholder="Fecha" />
            </div>
          </label>

          <label>
            <p className="text-16px py-2 ">ID condutor</p>
            <div>
              <input
                type="string"
                className="border pl-4 bg-gris-1 rounded-xl py-3 text-gris-2"
                placeholder="ID conductor"
              />
            </div>
          </label>
          <label>
            <p className="text-16px py-2 ">Fecha</p>
            <div>
              <input type="string" className="border pl-4 bg-gris-1 rounded-xl py-3 text-gris-2" placeholder="Fecha" />
            </div>
          </label>
          <label>
            <p className="text-16px py-2 ">Hora</p>
            <div>
              <input type="string" className="border pl-4 bg-gris-1 rounded-xl py-3 text-gris-2" placeholder="Hora" />
            </div>
          </label>
        </div>
        <button className="bg-blue-400 text-white max-w-xl rounded-xl w-full my-4 py-3 md:px-10 font-bold">
          Buscar
        </button>
      </form>

      <div className="py-3">
        <Tabla />
      </div>
    </div>
  );
}
