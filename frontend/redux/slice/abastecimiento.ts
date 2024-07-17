import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  fecha: '',
  hora: '',
  cantidad: '',
  tipoCilindroId: '',
  estadoCilindroId: '',
};

const abastecimientoSlice = createSlice({
  name: 'abastecimiento',
  initialState,
  reducers: {
    updateId(state, action: PayloadAction<typeof initialState.id>) {
      state.id = action.payload;
    },
  },
});
export const { updateId } = abastecimientoSlice.actions;
export default abastecimientoSlice.reducer;
