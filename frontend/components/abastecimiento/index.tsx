import React from 'react';
import Formulario from './formulario';
import Tabla from './tabla';

export default function SectionAbastecimiento() {
  return (
    <div className="w-full dark:bg-bgDark">
      <Formulario />
      <Tabla />
    </div>
  );
}
