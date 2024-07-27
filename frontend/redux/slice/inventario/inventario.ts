import { initialStateInventario } from '@/types/inventario_bodegas';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleGetTablaBodega } from './reducer';

const initialState: initialStateInventario = {
  messageResponse: '',
  tablaBodega: [],
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
  reducers: {
    filterByDate(state, action: PayloadAction<{ date: string }>) {
      const { tablaBodega } = state;
      const { date } = action.payload;
      const filteredData = tablaBodega?.find((item) => item.fecha === date) || null;
      state.tablaBodegaFiteredByDate = filteredData;
    },
  },
  extraReducers: (builder) => {
    handleGetTablaBodega(builder);
  },
});

export const { filterByDate } = inventarioSlice.actions;
export default inventarioSlice.reducer;
