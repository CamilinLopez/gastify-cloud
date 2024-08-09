import { axiosInstance } from '@/config/axios';
import { UserCredentials, UserResponse } from '@/types/usuarios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie'; 

export const RegistroThunk = createAsyncThunk<UserResponse, UserCredentials>(
  'usuarios/registro',
  async (userData: UserCredentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<UserResponse>('/empresa/registrar', userData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || 'Error desconocido');
      }
      return rejectWithValue('Error inesperado');
    }
  },
);

export const SendInviteThunk = createAsyncThunk(
  'usuarios/invite',
  async (userData: any, { rejectWithValue }) => {
    try {
      const token = Cookies.get('token'); 
      userData.empresa= token
      const response = await axiosInstance.post<any>('/empresa/post-empresa-invitar-usuario', userData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || 'Error desconocido');
      }
      return rejectWithValue('Error inesperado');
    }
  },
);

export const GetsUsersThunk = createAsyncThunk(
  'usuario/getsUsers',
  async ( _ ,{rejectWithValue}) => {
    try {
      const response = await axiosInstance.get<any>('/usuario/gets-usuarios');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || 'Error desconocido');
      }
      return rejectWithValue('Error inesperado');
    }
  },
);

export const LoginThunk = createAsyncThunk(
  'usuarios/login',
  async (userData: UserCredentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/empresa/signin', userData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || 'Error desconocido');
      }
      return rejectWithValue('Error inesperado');
    }
  }
);
