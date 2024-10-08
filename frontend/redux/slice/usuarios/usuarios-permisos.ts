import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@/config/axios';
import { RoutesMenu } from '@/arraysObjects/menu';

// Estado inicial
interface PermisosState {
  permisos: string[];
  filteredRoutes: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PermisosState = {
  permisos: [],
  filteredRoutes: [],
  status: 'idle',
  error: null,
};

// AsyncThunk para obtener los permisos
export const fetchPermisos = createAsyncThunk(
  'permisos/fetchPermisos',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/roles/roles-permisos`);
      return res.data.data;
    } catch (error) {
      return rejectWithValue('Error obteniendo permisos');
    }
  }
);

// Función para filtrar rutas
const filterRoutes = (routes: any[], permisos: string[]) => {

  let nombrePermisos = permisos.map((p:any)=>p.nombre)
  return routes.filter((route) => {
    if (!route.permisos || route.permisos.length === 0) {
      return true;
    }
    return nombrePermisos.includes(route.permisos);
  });
};

// Slice de permisos
const permisosSlice = createSlice({
  name: 'permisos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPermisos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPermisos.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.permisos = action.payload;
        state.filteredRoutes = filterRoutes(RoutesMenu, action.payload);
        state.status = 'succeeded';
      })
      .addCase(fetchPermisos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default permisosSlice.reducer;
