import { axiosInstance } from '@/config/axios';
import { DatosCamiones } from '@/types/inventario_camiones';
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

export const crearConductor = createAsyncThunk(
  '/inventario/crearConductor',
  async ({ nombre, licencia }: { nombre: string; licencia: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/inventario/crearConductor', { nombre, licencia });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || 'Error desconocido del servidor');
      }
      return rejectWithValue('Error inesperado');
    }
  },
);

export const getTablaConductores = createAsyncThunk('/inventario/TablaConductores', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/inventario/getTablaConductores');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data || 'Error desconocido del servidor');
    }
    return rejectWithValue('Error inesperado');
  }
});

export const crearCamion = createAsyncThunk(
  '/inventario/crearCamion',
  async ({ marca, modelo, capacidad_carga, placa }: DatosCamiones, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/inventario/crearCamiones', { marca, modelo, capacidad_carga, placa });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || 'Error desconocido del servidor');
      }
      return rejectWithValue('Error inesperado');
    }
  },
);

export const tablaCamion = createAsyncThunk('/inventario/TablaCamion', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/inventario/getTablaCamiones');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data || 'Error desconocido del servidor');
    }
    return rejectWithValue('Error inesperado');
  }
});

export const borrarCamiones = createAsyncThunk(
  '/inventario/borrarCamiones',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/inventario/deleteCamiones/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || 'Error desconocido del servidor');
      }
      return rejectWithValue('Error inesperado');
    }
  },
);

export const borrarConductores = createAsyncThunk(
  '/inventario/borrarConductores',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/inventario/deleteConductores/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || 'Error desconocido del servidor');
      }
      return rejectWithValue('Error inesperado');
    }
  },
);
