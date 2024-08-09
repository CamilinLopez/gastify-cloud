import { axiosInstance } from '@/config/axios';
import { CargaDatos } from '@/types/operaciones';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const TablaCargaThunk = createAsyncThunk(
  'operaciones/cargarDatos',
  async (datosTablaCarga: CargaDatos, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/operaciones/crearOperacion', datosTablaCarga);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || 'Error desconocido');
      }
      return rejectWithValue('Error inesperado');
    }
  },
);
