import React from 'react';
import { Flechas } from '../svg/svgImages';

export default function Registro_entradas_salidas() {
  const salida = [
    {
      id: '14589785d',
      title: 'Cilindros fallados',
    },
    {
      id: 'jkdperty5',
      title: 'Cilindros vacios',
    },
    {
      id: 'pertmldf5',
      title: 'Cilindros prestados',
    },
  ];
  return (
    <div className="p-4 w-full">
      <div className="w-full flex flex-col">
        <div className="py-4">
          <h1 className="text-18px">Registro de entradas y salidas</h1>
        </div>
        <form className="w-full flex flex-col gap-y-6">
          <div>
            <p className="text-16px py-2">Tipo de cilindro</p>
            <div className="relative w-1/3">
              <input
                className="h-12 w-full bg-gris-1 rounded-xl pl-3 pr-10"
                type="text"
                placeholder="5 kg, 11 kg, 15 kg, 45 kg, H15"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex flex-col justify-center">
                <Flechas />
              </div>
            </div>
          </div>
          <div className="w-1/3">
            <p className="text-16px py-2">Cilindros llenos</p>
            <input
              placeholder="100, 200, 300, 400, 500"
              className="h-12 w-full bg-gris-1 rounded-xl pl-3 pr-10"
              type="text"
            />
          </div>
          <div>
            <div className="w-full flex gap-x-4">
              {salida.map((item) => (
                <div key={item.id} className="w-1/4">
                  <p className="text-16px py-2">{item.title}</p>
                  <input placeholder="0" className="h-12 w-full bg-gris-1 rounded-xl pl-3 pr-10" type="text" />
                </div>
              ))}
            </div>
          </div>
          <div className="w-full">
            <p className="text-16px py-2">Fecha de movimiento</p>
            <input type="date" className="h-12 w-1/3 bg-gris-1 rounded-xl pl-3 pr-10" />
          </div>
          <div className="w-full">
            <p className="text-16px py-2">ID responsable</p>
            <input placeholder="1sfgry9d2gsx" type="text" className="h-12 w-1/3 bg-gris-1 rounded-xl pl-3 pr-10" />
          </div>
          <button className="font-Inter font-bold text-[16px] text-blanco bg-[#1C8CD6] h-12 rounded-xl w-1/3">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}
