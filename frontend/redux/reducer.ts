import { combineReducers } from 'redux';
import abastecimientoReducer from './slice/abastecimiento/abastecimiento';

const rootReducer = combineReducers({
  abastecimiento: abastecimientoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export { rootReducer };