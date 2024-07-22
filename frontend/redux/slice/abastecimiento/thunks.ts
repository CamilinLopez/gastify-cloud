import { axiosInstance } from '@/config/axios';
import { FormAbastecimiento } from '@/types/abastecimieneto';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

export const postInfo = createAsyncThunk(
  'abasatecimiento/guardarInfo',
  async (abastecimieneto: FormAbastecimiento, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        'https://localhost:3001/abastecimiento/crearAbastecimiento',
        abastecimieneto,
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || 'Error desconocido del servidor');
      }
      return rejectWithValue('Error inesperado');
    }
  },
);

export const getInfo = createAsyncThunk('abascecimiento/getInfo', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('https://localhost:3001/abastecimiento/getAbastecimiento');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data || 'Error desconocido del servidor');
    }
    return rejectWithValue('Error inesperado');
  }
});
