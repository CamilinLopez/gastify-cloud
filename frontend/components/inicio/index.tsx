import React from 'react';
import Resumen_ventas from './resumen_ventas';
import Rendimiento_conductores from './rendimiento_conductores';
import ResumenInventario from './resumen_inventario';

export default function SectionsInicio() {
  return (
    <div className="w-full">
      <ResumenInventario />
      <Resumen_ventas />
      <Rendimiento_conductores />
    </div>
  );
}
