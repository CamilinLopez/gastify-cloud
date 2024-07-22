import { initialStateFormAbastecimiento } from '@/types/abastecimieneto';
import { createSlice } from '@reduxjs/toolkit';
import { handleFetchAbastecimiento, handleGetAbastecimiento } from './reducer';

const initialState: initialStateFormAbastecimiento = {
  data: [],
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
    handleGetAbastecimiento(builder);
  },
});
export const { updateAll } = abastecimientoSlice.actions;
export default abastecimientoSlice.reducer;
