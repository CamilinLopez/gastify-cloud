import { combineReducers } from 'redux';
import abastecimientoReducer from './slice/abastecimiento/abastecimiento';
import inventarioReducer from './slice/inventario/inventario';
import operacionesReducer from './slice/operaciones/operaciones';
import reportesReducer from './slice/reportes/reportes';
import inicioReducer from './slice/inicio/inicio';
import usuarios from './slice/usuarios/usuarios';

import rolesReducer from './slice/roles/roles';
import permisosReducer from './slice/roles/permisos'
import usuarioPasswordReducer from './slice/usuarios/usuario-set-password'

const rootReducer = combineReducers({
  abastecimiento: abastecimientoReducer,
  inventario: inventarioReducer,
  operaciones: operacionesReducer,
  reportes: reportesReducer,
  inicio: inicioReducer,
  usuarios:usuarios.usuarios,
  getsUsuarios:usuarios.usuariosGets,
  roles:rolesReducer,
  permisos:permisosReducer,
  setPassword:usuarioPasswordReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export { rootReducer };
