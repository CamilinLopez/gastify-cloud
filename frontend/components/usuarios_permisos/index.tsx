import React from 'react';
import InvitarUsuarios from './invitarUsuarios';
import GestionUsuarios from './gestionUsuarios';

export default function SectionUsuariosPermisos() {
  return (
    <div className="w-full">
      <InvitarUsuarios />
      <GestionUsuarios />
    </div>
  );
}
