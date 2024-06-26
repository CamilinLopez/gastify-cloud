export interface FormGestiosUsuarios {
  'correo electrónico': string;
  Rol: 'Administrador' | 'Supervisor' | 'Bodeguero';
  'Estado de invitación': 'Pendiente' | 'Aceptada' | 'Rechazada';
  Acciones: 'Reenviar' | 'Revocar';
  'Enviar invitación': 'Enviar invitación' | '';
}

export interface TablaGestiosUsuarios {
  'correo electrónico': string;
  Rol: 'Administrador' | 'Supervisor' | 'Bodeguero';
  'Estado de invitación': 'Pendiente' | 'Aceptada' | 'Rechazada';
  Acciones: 'Reenviar' | 'Revocar';
}
