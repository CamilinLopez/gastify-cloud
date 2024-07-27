import { initialStateInventario } from '@/types/inventario_bodegas';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleGetTablaBodega } from './reducer';

const initialState: initialStateInventario = {
  messageResponse: '',
  tablaBodegaFiteredByDate: {
    fecha: '',
    tipos: [],
  },
  status: 'idle',
  error: null,
};

const inventarioSlice = createSlice({
  name: 'inventario',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleGetTablaBodega(builder);
  },
});

export const {} = inventarioSlice.actions;
export default inventarioSlice.reducer;
