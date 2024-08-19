import { axiosInstance } from '@/config/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTablaInventarioResumen = createAsyncThunk(
  'inicio/tablaInventarioResumen',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/inicio/getTablaResumenInventario');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || 'Error desconocido del servidor');
      }
      return rejectWithValue('Error inesperado');
    }
  },
);

export const getVentasPorDia = createAsyncThunk('inicio/ventaPorDia', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/inicio/getReportePorDia');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data || 'Error desconocido del servidor');
    }
    return rejectWithValue('Error inesperado');
  }
});

export const getVentasPorMes = createAsyncThunk('inicio/ventaPorMes', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/inicio/getReportePorMes');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data || 'Error desconocido del servidor');
    }
    return rejectWithValue('Error inesperado');
  }
});
