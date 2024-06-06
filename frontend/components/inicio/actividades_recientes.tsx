interface Actividad {
  fecha: string;
  tipoCilindro: string;
  cantidad: number;
  operaciones: 'Carga' | 'Retorno';
}

const Tabla = () => {
  const actividades: Actividad[] = [
    { fecha: '01/01/2023', tipoCilindro: '5 kg', cantidad: 10, operaciones: 'Carga' },
    { fecha: '02/01/2023', tipoCilindro: '11 kg', cantidad: 20, operaciones: 'Retorno' },
    { fecha: '03/01/2023', tipoCilindro: '15 kg', cantidad: 30, operaciones: 'Carga' },
    { fecha: '04/01/2023', tipoCilindro: '45 kg', cantidad: 40, operaciones: 'Retorno' },
    { fecha: '05/01/2023', tipoCilindro: 'H15', cantidad: 50, operaciones: 'Carga' },
  ];

  return (
    <div className="overflow-x-auto border-[1px] rounded-xl">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-blanco">
          <tr className="[&>*]:px-6 [&>*]:py-3  [&>*]:text-xs [&>*]:text-14px">
            <th className="text-left">Fecha</th>
            <th className="text-left">Tipo De cilindro</th>
            <th className="text-left">Cantidad</th>
            <th className="text-center">Operaciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {actividades.map((row, index) => (
            <tr key={index} className="[&>*]:py-4">
              <td className="px-6 py-4 text-14px text-secondary-14px">{row.fecha}</td>
              <td className="px-6 py-4 text-14px">{row.tipoCilindro}</td>
              <td className="px-6 py-4 text-secondary-14px">{row.cantidad}</td>
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
