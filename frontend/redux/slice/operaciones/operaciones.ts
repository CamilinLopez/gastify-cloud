import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleFetchTablaCarga } from './reducer';
import { InitialStateOperaciones } from '@/types/operaciones';

const initialState: InitialStateOperaciones = {
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
  },
});
export const {} = operacionesSlice.actions;
export default operacionesSlice.reducer;
