import React from 'react';
import Resumen_ventas from './resumen_ventas';
import Notificaciones_alertas from './notificaciones_alertas';

export default function SectionsInicio() {
  return (
    <div className='w-full' >
      <Notificaciones_alertas />
      <Resumen_ventas />
    </div>
  );
}
