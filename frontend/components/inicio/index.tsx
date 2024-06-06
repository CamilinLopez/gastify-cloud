import React from 'react';
import Resumen_ventas from './resumen_ventas';
import Rendimiento_conductores from './rendimiento_conductores';

export default function SectionsInicio() {
  return (
    <div className="w-full">
      <Resumen_ventas />
      <Rendimiento_conductores />
      
    </div>
  );
}
