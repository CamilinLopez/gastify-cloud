import { axiosInstance } from '@/config/axios';
import { RolesResponse, Role } from '@/types/roles';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const RolesThunk = createAsyncThunk(
  'roles/getsRoles',
  async ( _ ,{rejectWithValue}) => {
    try {
      const response = await axiosInstance.get<RolesResponse>('/roles/get-roles');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || 'Error desconocido');
      }
      return rejectWithValue('Error inesperado');
    }
  },
);


export const PermisosThunk = createAsyncThunk(
  'roles/getsPermisos',
  async ( _ ,{rejectWithValue}) => {
    try {
      const response = await axiosInstance.get<RolesResponse>('/roles/get-permisos');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || 'Error desconocido');
      }
      return rejectWithValue('Error inesperado');
    }
  },
);
