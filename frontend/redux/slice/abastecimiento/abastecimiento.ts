import { FormAbastecimiento } from '@/types/abastecimieneto';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: FormAbastecimiento = {
  id: '',
  fecha: '',
  hora: '',
  cantidad: 0,
  tipoCilindroId: { id: '', tipo: '' },
  estadoCilindroId: { id: '', tipo: '' },
};

const abastecimientoSlice = createSlice({
  name: 'abastecimiento',
  initialState,
  reducers: {
    updateAll(state, action) {
      return { ...state, ...action.payload };
    },
  },
});
export const { updateAll } = abastecimientoSlice.actions;
export default abastecimientoSlice.reducer;
