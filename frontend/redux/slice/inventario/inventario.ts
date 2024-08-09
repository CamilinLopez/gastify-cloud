import { initialStateInventario } from '@/types/inventario_bodegas';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  handleGetTablaBodega,
  handleCrearConductor,
  handleTablaConducter,
  handleCrearCamion,
  handleGetTablaCamion,
  handleDeleteCamion,
  handleDeleteConductores,
} from './reducer';

const initialState: initialStateInventario = {
  sectionCamiones: { message: '', tabla: [] },
  sectionConductores: {
    message: '',
    tabla: [],
  },
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
    handleCrearConductor(builder);
    handleTablaConducter(builder);
    handleCrearCamion(builder);
    handleGetTablaCamion(builder);
    handleDeleteCamion(builder);
    handleDeleteConductores(builder);
  },
});

export const {} = inventarioSlice.actions;
export default inventarioSlice.reducer;
