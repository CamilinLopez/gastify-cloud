import { axiosInstance } from '@/config/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTablaBodega = createAsyncThunk('inventario/tablaBodega', async (fecha: string, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/inventario/getTablaInventarioBodega', { params: { fecha } });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data || 'Error desconocido del servidor');
    }
    return rejectWithValue('Error inesperado');
  }
});
