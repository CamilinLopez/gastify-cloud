import { combineReducers } from 'redux';
import abastecimientoReducer from './slice/abastecimiento/abastecimiento';
import inventarioReducer from './slice/inventario/inventario';

const rootReducer = combineReducers({
  abastecimiento: abastecimientoReducer,
  inventario: inventarioReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export { rootReducer };
