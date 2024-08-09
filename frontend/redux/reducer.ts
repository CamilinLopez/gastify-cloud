import { combineReducers } from 'redux';
import abastecimientoReducer from './slice/abastecimiento/abastecimiento';
import inventarioReducer from './slice/inventario/inventario';
import operacionesReducer from './slice/operaciones/operaciones';
import usuarios from './slice/usuarios/usuarios';

import rolesReducer from './slice/roles/roles';

const rootReducer = combineReducers({
  abastecimiento: abastecimientoReducer,
  inventario: inventarioReducer,
  operaciones: operacionesReducer,
  usuarios:usuarios.usuarios,
  getsUsuarios:usuarios.usuariosGets,
  roles:rolesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export { rootReducer };
