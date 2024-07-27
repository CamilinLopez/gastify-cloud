import { initialStateAbastecimiento } from '@/types/abastecimieneto';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleFetchAbastecimiento, handleGetTablaStock } from './reducer';

const initialState: initialStateAbastecimiento = {
  dataResponse: {
    id: '',
    fecha: '',
    hora: '',
    cantidad: 0,
    estadoCilindroId: null,
    tipoCilindroId: null,
  },
  tablaResponse: [],
  messageResponse: '',
  error: null,
  status: 'idle',
};

const abastecimientoSlice = createSlice({
  name: 'abastecimiento',
  initialState,
  reducers: {
    updateAll(state, action) {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    handleFetchAbastecimiento(builder);
    handleGetTablaStock(builder);
  },
});
export const { updateAll } = abastecimientoSlice.actions;
export default abastecimientoSlice.reducer;
