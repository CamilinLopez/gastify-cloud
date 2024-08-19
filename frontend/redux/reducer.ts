import { combineReducers } from 'redux';
import abastecimientoReducer from './slice/abastecimiento/abastecimiento';
import inventarioReducer from './slice/inventario/inventario';
import operacionesReducer from './slice/operaciones/operaciones';
import reportesReducer from './slice/reportes/reportes';
import inicioReducer from './slice/inicio/inicio';

const rootReducer = combineReducers({
  abastecimiento: abastecimientoReducer,
  inventario: inventarioReducer,
  operaciones: operacionesReducer,
  reportes: reportesReducer,
  inicio: inicioReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export { rootReducer };
