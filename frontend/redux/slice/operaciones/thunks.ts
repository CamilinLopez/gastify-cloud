import { axiosInstance } from '@/config/axios';
import { CargaDatos, cargaDatosTablaDescarga, Formulario } from '@/types/operaciones';
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

export const GetTablaReportesDiarios = createAsyncThunk(
  'operaciones/getTablaOperacionesDiarias',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/operaciones/getTablaReportesDiarios');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || 'Error desconocido');
      }
      return rejectWithValue('Error inesperado');
    }
  },
);

export const GetTablaVisualCarga = createAsyncThunk(
  'operaciones/getTablaVisualCarga',
  async (carga_id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/operaciones/getTablaVisualCarga', { params: { carga_id } });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || 'Error desconocido');
      }
      return rejectWithValue('Error inesperado');
    }
  },
);

export const RegistrarTablaDescarga = createAsyncThunk(
  'operaciones/postTablaDescarga',
  async (formTabla: cargaDatosTablaDescarga, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/operaciones/crearTablaDescarga', formTabla);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || 'Error desconocido');
      }
      return rejectWithValue('Error inesperado');
    }
  },
);
