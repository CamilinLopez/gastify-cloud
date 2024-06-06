import React from 'react';
import Resumen_ventas from './resumen_ventas';
import ResumenInventario from './resumen_inventario';



export default function SectionsInicio() {
  return (
    <div className="w-full">
      <ResumenInventario />
      <Resumen_ventas />
    </div>
  );
}
