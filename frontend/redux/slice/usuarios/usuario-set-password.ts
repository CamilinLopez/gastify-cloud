import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleFetchRegistroLogin, handleFetchUsuarioSetPassword } from './reducer';
import { UsersSetPasswordState } from '@/types/usuarios';

// Slice de Registro
const initialState: UsersSetPasswordState = {
  email: '',
  password: '',
  empresa:''
};


const usuariosSetPasswordSlice = createSlice({
  name: 'usuario-set-password',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleFetchUsuarioSetPassword(builder);
  },
});

export const {} = usuariosSetPasswordSlice.actions;
export default usuariosSetPasswordSlice.reducer;
