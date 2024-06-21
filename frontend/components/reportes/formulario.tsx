import React from 'react';

export default function Formulario() {
  return (
    <div className="p-4 w-full">
      <h1 className="text-18px py-6">Filtro de Reportes Diarios</h1>
      <div>
        <form className="w-full flex flex-col gap-y-5" action="">
          <div className="w-full flex flex-col gap-y-2">
            <p className="text-16px">Fecha</p>
            <input className="p-4 h-14 bg-gris-1 rounded-xl w-5/12" type="date" />
          </div>
          <div className="w-full flex flex-col gap-y-2">
            <p className="text-16px">Número de móvil</p>
            <input className="p-4 h-14 bg-gris-1 rounded-xl w-5/12 pl-4 pr-24" placeholder="DFG-156" type="text" />
          </div>
          <div className="w-full flex flex-col gap-y-2">
            <p className="text-16px">ID Conductor</p>
            <input className="p-4 h-14 bg-gris-1 rounded-xl w-5/12 pl-4 pr-24" placeholder="14568dsd55f" type="text" />
          </div>
        </form>
      </div>
    </div>
  );
}
