import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@/config/axios';

type UsuarioType = {
  id: string;
  nombre: string;
  email: string;
  rol: {
    nombre: string;
  };
};

// Estado inicial
interface UsuarioState {
  usuario: UsuarioType | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UsuarioState = {
  usuario: null,
  status: 'idle',
  error: null,
};

// AsyncThunk para obtener los datos del usuario
export const fetchUsuarioData = createAsyncThunk(
  'usuario/fetchUsuarioData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/usuario/get-usuario-data');
      return response.data.empresa || response.data.usuario;
    } catch (error) {
      return rejectWithValue('Error obteniendo datos del usuario');
    }
  }
);

// Slice del usuario
const usuarioSlice = createSlice({
  name: 'usuario',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsuarioData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsuarioData.fulfilled, (state, action: PayloadAction<UsuarioType>) => {
        state.usuario = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchUsuarioData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default usuarioSlice.reducer;
