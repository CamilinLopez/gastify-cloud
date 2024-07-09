import React from 'react';
import InvitarUsuarios from './invitarUsuarios';
import GestionUsuarios from './gestionUsuarios';
import ConfiguracionUsuarios from './configuracionUsuarios';

export default function SectionUsuariosPermisos() {
  return (
    <div className="w-full">
      <InvitarUsuarios />
      <GestionUsuarios />
      <ConfiguracionUsuarios />
    </div>
  );
}
