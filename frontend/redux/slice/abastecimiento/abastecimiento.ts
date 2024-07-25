import { FechaInventario, initialStateFormAbastecimiento } from '@/types/abastecimieneto';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleFetchAbastecimiento, handleGetAbastecimiento } from './reducer';

const initialState: initialStateFormAbastecimiento = {
  data: null,
  filteredData: null,
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
    filterByDate(state, action: PayloadAction<{ date: string }>) {
      const { data } = state;
      const { date } = action.payload;
      if (data) {
        const filteredData = data.find((item) => item.fecha === date) || null;
        state.filteredData = filteredData;
      }
    },
  },
  extraReducers: (builder) => {
    handleFetchAbastecimiento(builder);
    handleGetAbastecimiento(builder);
  },
});
export const { updateAll, filterByDate } = abastecimientoSlice.actions;
export default abastecimientoSlice.reducer;
