import React from 'react';
import Resumen_ventas from './resumen_ventas';
import Rendimiento_conductores from './rendimiento_conductores';
import ResumenInventario from './resumen_inventario';
import Actividades_recientes from './actividades_recientes';

export default function SectionsInicio() {
  return (
    <div className="w-full">
      <ResumenInventario />
      <Resumen_ventas />
      <Actividades_recientes />
      <Rendimiento_conductores />
    </div>
  );
}
