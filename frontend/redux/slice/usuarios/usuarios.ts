import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleFetchRegistroLogin, handleFetchUsuarios } from './reducer';
import { InitialStateUsuarios, User, UsersState } from '@/types/usuarios';

// Slice de Registro
const initialState: InitialStateUsuarios = {
  user: {
    message:'',
    user:{id:'',email:''}
  },
  messageResponse: '',
  error: null,
  status: 'idle',
};

const usuariosSlice = createSlice({
  name: 'usuarios',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleFetchRegistroLogin(builder);
  },
});


// Slice de Obtener Usuarios
const initialUsersState: UsersState = {
  data: [],
  messageResponse: '',
  error: null,
  status: 'idle',
};

const usuariosGetsSlice = createSlice({
  name: 'usuarios-gets',
  initialState: initialUsersState,
  reducers: {},
  extraReducers: (builder) => {
    handleFetchUsuarios(builder);
  },
});

// Exporta acciones y reducers
export const {} = usuariosSlice.actions;
export const {} = usuariosGetsSlice.actions;
export default {
  usuarios: usuariosSlice.reducer,
  usuariosGets: usuariosGetsSlice.reducer,
};