import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleFetchUsuariosFilter } from './reducer';

// Slice de Registro
const initialState = {
  id: '',
  email: '',
  rolId:''
};


const usuariosfiltersSlice = createSlice({
  name: 'usuarios-filter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleFetchUsuariosFilter(builder);
  },
});

export const {} = usuariosfiltersSlice.actions;
export default usuariosfiltersSlice.reducer;

