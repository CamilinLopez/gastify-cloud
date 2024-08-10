import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  handleFetchTablaCarga,
  handleGetTablaReportesDiarios,
  handleGetTablaVisualCarga,
  handlePostTablaDescatga,
  handleGetTablaDescatga,
} from './reducer';
import { InitialStateOperaciones } from '@/types/operaciones';

const initialState: InitialStateOperaciones = {
  responseTablaDescarga: {
    message: '',
    result: [],
  },
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
    handlePostTablaDescatga(builder);
    handleGetTablaDescatga(builder);
  },
});
export const {} = operacionesSlice.actions;
export default operacionesSlice.reducer;
