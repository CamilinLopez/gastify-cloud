import { FormAbastecimiento, initialStateFormAbastecimiento } from '@/types/abastecimieneto';
import { createSlice } from '@reduxjs/toolkit';
import { handleFetchAbastecimiento } from './reducer';

const initialState: initialStateFormAbastecimiento = {
  id: '',
  fecha: '',
  hora: '',
  cantidad: 0,
  tipoCilindroId: { id: '', tipo: '' },
  estadoCilindroId: { id: '', tipo: '' },
  status: 'idle',
  error: null,
  successMessage: null,
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
  },
});
export const { updateAll } = abastecimientoSlice.actions;
export default abastecimientoSlice.reducer;
