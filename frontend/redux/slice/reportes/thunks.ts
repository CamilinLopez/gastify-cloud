import { axiosInstance } from '@/config/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const GetTablaReportes = createAsyncThunk(
  'reportes/getTablaReportes',
  async (
    { fecha, conductor_id, empresaId }: { fecha: string; conductor_id: string; empresaId: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.get('/reportes/getTablaReportes', {
        params: { fecha, conductor_id, empresaId },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || 'Error desconocido');
      }
      return rejectWithValue('Error inesperado');
    }
  },
);
