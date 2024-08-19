import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { permisosReducer,  } from './reducer';
import { PermisosState } from '@/types/roles';


const initialState:PermisosState = {
  permisos: [],
  status: 'idle',
  error: null,
  messageResponse: '',
};

const permisosSlice = createSlice({
  name: 'permisos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    permisosReducer(builder);
  },
});
export const {} = permisosSlice.actions;
export default permisosSlice.reducer;
