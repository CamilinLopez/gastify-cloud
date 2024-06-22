import React from 'react';
import Formulario from './formulario';
import Tabla from './tabla';

export default function SectionAbastecimiento() {
  return (
    <div className="w-full">
      <Formulario />
      <Tabla />
    </div>
  );
}
