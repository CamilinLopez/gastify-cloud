import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleGetTablaResumenInventario, handleGetVentaPorDia, handleGetVentaPorMes } from './reducer';
import { initialStateInicio } from '@/types/inicio';

const initialState: initialStateInicio = {
  responseVentaPorMes: { message: '', result: [] },
  responseVentaPorDia: { message: '', today: '', result: [] },
  responseTablaResumenInventario: { message: '', result: { llenos: [], vacios: [] } },
  status: 'idle',
  error: null,
};

const inicioSlice = createSlice({
  name: 'inicio',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleGetTablaResumenInventario(builder);
    handleGetVentaPorDia(builder);
    handleGetVentaPorMes(builder);
  },
});

export const {} = inicioSlice.actions;
export default inicioSlice.reducer;
