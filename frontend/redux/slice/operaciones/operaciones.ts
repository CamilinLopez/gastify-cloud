import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleFetchTablaCarga, handleGetTablaReportesDiarios, handleGetTablaVisualCarga } from './reducer';
import { InitialStateOperaciones } from '@/types/operaciones';

const initialState: InitialStateOperaciones = {
  responseTablaVisualCarga: {
    message: '',
    result: [],
  },
  responseTablaReportesDiarios: {
    message: '',
    result: [],
  },
  responseTablaCarga: {
    movil: '',
    conductorId: '',
    cilindrosTerminados: {
      message: '',
      result: [],
    },
  },
  messageResponse: '',
  error: null,
  status: 'idle',
};

const operacionesSlice = createSlice({
  name: 'operaciones',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleFetchTablaCarga(builder);
    handleGetTablaReportesDiarios(builder);
    handleGetTablaVisualCarga(builder);
  },
});
export const {} = operacionesSlice.actions;
export default operacionesSlice.reducer;
