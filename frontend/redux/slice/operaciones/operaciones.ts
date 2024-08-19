import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  handleFetchTablaCarga,
  handleGetTablaReportesDiarios,
  handleGetTablaVisualCarga,
  handlePostTablaDescatga,
  handleGetTablaDescatga,
  handlePostTablaVentas,
  handleGetTablaVentas,
} from './reducer';
import { InitialStateOperaciones } from '@/types/operaciones';

const initialState: InitialStateOperaciones = {
  responseTablaVentas: {
    message: '',
    result: [],
  },
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
    handlePostTablaVentas(builder);
    handleGetTablaVentas(builder);
  },
});
export const {} = operacionesSlice.actions;
export default operacionesSlice.reducer;
