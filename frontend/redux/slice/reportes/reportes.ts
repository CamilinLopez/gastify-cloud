import { InitialStateReportes } from '@/types/reportes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleFetchTablaReportes } from './reducer';

const initialState: InitialStateReportes = {
  responseTablaReportes: { message: '', result: [] },
  error: null,
  status: 'idle',
};

const reportesSlice = createSlice({
  name: 'reportes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleFetchTablaReportes(builder);
  },
});
export const {} = reportesSlice.actions;
export default reportesSlice.reducer;
