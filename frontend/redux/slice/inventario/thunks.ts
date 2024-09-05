import { axiosInstance } from '@/config/axios';
import { DatosCamiones } from '@/types/inventario_camiones';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTablaBodega = createAsyncThunk(
  'inventario/tablaBodega',
  async ({ fecha, empresaId }: { fecha: string; empresaId: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/inventario/getTablaInventarioBodega', {
        params: { fecha, empresaId },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || 'Error desconocido del servidor');
      }
      return rejectWithValue('Error inesperado');
    }
  },
);

export const crearConductor = createAsyncThunk(
  '/inventario/crearConductor',
  async (
    { nombre, licencia, empresaId }: { nombre: string; licencia: string; empresaId: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.post('/inventario/crearConductor', { nombre, licencia, empresaId });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || 'Error desconocido del servidor');
      }
      return rejectWithValue('Error inesperado');
    }
  },
);

export const getTablaConductores = createAsyncThunk(
  '/inventario/TablaConductores',
  async (empresaId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/inventario/getTablaConductores', { params: { empresaId } });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || 'Error desconocido del servidor');
      }
      return rejectWithValue('Error inesperado');
    }
  },
);

export const crearCamion = createAsyncThunk(
  '/inventario/crearCamion',
  async ({ marca, modelo, capacidad_carga, placa, empresaId }: DatosCamiones, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/inventario/crearCamiones', {
        marca,
        modelo,
        capacidad_carga,
        placa,
        empresaId,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || 'Error desconocido del servidor');
      }
      return rejectWithValue('Error inesperado');
    }
  },
);

export const tablaCamion = createAsyncThunk(
  '/inventario/TablaCamion',
  async (empresaId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/inventario/getTablaCamiones', { params: { empresaId } });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || 'Error desconocido del servidor');
      }
      return rejectWithValue('Error inesperado');
    }
  },
);

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
