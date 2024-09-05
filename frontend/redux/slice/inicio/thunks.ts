import { axiosInstance } from '@/config/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTablaInventarioResumen = createAsyncThunk(
  'inicio/tablaInventarioResumen',
  async (empresaId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/inicio/getTablaResumenInventario', { params: { empresaId } });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || 'Error desconocido del servidor');
      }
      return rejectWithValue('Error inesperado');
    }
  },
);

export const getVentasPorDia = createAsyncThunk(
  'inicio/ventaPorDia',
  async (empresaId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/inicio/getReportePorDia', { params: { empresaId } });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || 'Error desconocido del servidor');
      }
      return rejectWithValue('Error inesperado');
    }
  },
);

export const getVentasPorMes = createAsyncThunk(
  'inicio/ventaPorMes',
  async (empresaId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/inicio/getReportePorMes', { params: { empresaId } });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || 'Error desconocido del servidor');
      }
      return rejectWithValue('Error inesperado');
    }
  },
);
