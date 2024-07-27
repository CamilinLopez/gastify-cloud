import { axiosInstance } from '@/config/axios';
import { FormAbastecimiento } from '@/types/abastecimieneto';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

export const crearFormulario = createAsyncThunk(
  'abastecimiento/guardarInfo',
  async (abastecimieneto: FormAbastecimiento, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/abastecimiento/crearAbastecimiento', abastecimieneto);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || 'Error desconocido del servidor');
      }
      return rejectWithValue('Error inesperado');
    }
  },
);

export const getTablaStock = createAsyncThunk('abastecimiento/getTablaStock', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/abastecimiento/getTablaStock');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data || 'Error desconocido del servidor');
    }
    return rejectWithValue('Error inesperado');
  }
});

