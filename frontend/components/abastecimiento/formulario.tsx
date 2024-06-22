import React from 'react';
import { Flechas } from '../svg/svgImages';

export default function Formulario() {
  return (
    <div className="p-4 w-full">
      <h1 className="text-18px py-6">Registro de abastecimiento</h1>
      <div className="w-full">
        <form className="w-full flex flex-col gap-y-5" action="">
          <div className="w-full flex">
            
            <div className="w-1/2 flex flex-col gap-y-3 ">
              <div className="w-full flex flex-col gap-y-2">
                <p className="text-16px py-2">Fecha de abastecimiento</p>
                <input className="p-4 h-14 bg-gris-1 rounded-xl w-10/12" type="date" />
              </div>
              <div className="w-full flex flex-col gap-y-2">
                <p className="text-16px py-2">Tipo de cilindro</p>
                <div className="relative w-10/12">
                  <input className="p-4 h-14 bg-gris-1 rounded-xl w-full" type="text" placeholder="Seleccionar" />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex flex-col justify-center">
                    <Flechas />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-1/2  flex flex-col gap-y-3 ">
              <div className="w-full flex flex-col gap-y-2">
                <p className="text-16px py-2">Cantidad recibida</p>
                <input className="p-4 h-14 bg-gris-1 rounded-xl w-10/12" type="text" placeholder="Ingresar cantidad" />
              </div>
              <div className="w-full flex flex-col gap-y-2">
                <p className="text-16px py-2">Proveedor</p>
                <input type="text" className="p-4 h-14 bg-gris-1 rounded-xl w-10/12" placeholder="Ingresar" />
              </div>
            </div>
          </div>

          <div className="w-full">
            <p className="text-16px py-2">Observaciones</p>
            <textarea className="w-5/12 h-36 bg-gris-1 rounded-xl" />
          </div>

          <button className="w-5/12 h-12 bg-azul rounded-xl font-Inter font-[500] text-blanco">Registrar</button>
        </form>
      </div>
    </div>
  );
}
