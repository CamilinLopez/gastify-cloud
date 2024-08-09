import Cookies from 'js-cookie';
import { InitialStateUsuarios } from '@/types/usuarios';
import { RegistroThunk, LoginThunk, SendInviteThunk, GetsUsersThunk } from './thunks';

export const handleFetchRegistroLogin = (builder: any) => {
  builder
  // registrar
    .addCase(RegistroThunk.pending, (state: InitialStateUsuarios) => {
      state.status = 'loading';
    })
    .addCase(RegistroThunk.fulfilled, (state: InitialStateUsuarios, action: any) => {
      state.user = action.payload.empresa;
      state.messageResponse = action.payload.message;
      state.status = 'succeeded';
      state.error = null;

      // Establece el token en las cookies usando js-cookie
      Cookies.set('token', action.payload.token, {
        expires: 7, // La cookie expirará en 7 días
        secure: true, // Solo en HTTPS
        sameSite: 'strict', // Misma política de sitio
      });
    })
    .addCase(RegistroThunk.rejected, (state: InitialStateUsuarios, action: any) => {
      state.status = 'failed';
      state.messageResponse = null;
      state.error = action.payload.message || 'Error desconocido';
    })


// login
    .addCase(LoginThunk.pending, (state: InitialStateUsuarios) => {
      state.status = 'loading';
    })
    .addCase(LoginThunk.fulfilled, (state: InitialStateUsuarios, action: any) => {
      state.user = action.payload.user;
      state.messageResponse = action.payload.message;
      state.status = 'succeeded';
      state.error = null;
    })
    .addCase(LoginThunk.rejected, (state: InitialStateUsuarios, action: any) => {
      state.status = 'failed';
      state.messageResponse = null;
      state.error = action.payload.errors || 'Error desconocido';
    })


// enviar invitacion  
    .addCase(SendInviteThunk.pending, (state: any) => {
      state.status = 'loading';
    })
    .addCase(SendInviteThunk.fulfilled, (state: any, action: any) => {
      console.log(action)
      state.user = action.payload.usuario;
      state.messageResponse = action.payload.message;
      state.status = 'succeeded';
      state.error = null;
    })
    .addCase(SendInviteThunk.rejected, (state: any, action: any) => {
      state.status = 'failed';
      state.messageResponse = null;
      state.error = action.payload.errors || 'Error desconocido';
    })


    // obtener todos los usuarios  
    .addCase(GetsUsersThunk.pending, (state: any) => {
      // console.log('loading',state)
      state.status = 'loading';
    })
    .addCase(GetsUsersThunk.fulfilled, (state: any, action: any) => {
      state.users = action.payload.message;
      state.messageResponse = action.payload.message;
      state.status = 'succeeded';
      state.error = null;
    })
    .addCase(GetsUsersThunk.rejected, (state: any, action: any) => {
      state.status = 'failed';
      state.messageResponse = null;
      state.error = action.payload.errors || 'Error desconocido';
    });
};

export const handleFetchUsuarios = (builder: any) => {
  builder

    // obtener todos los usuarios  
    .addCase(GetsUsersThunk.pending, (state: any) => {
      state.status = 'loading';
    })
    .addCase(GetsUsersThunk.fulfilled, (state: any, action: any) => {
      state.data = action.payload.data;
      state.messageResponse = action.payload.message;
      state.status = 'succeeded';
      state.error = null;
    })
    .addCase(GetsUsersThunk.rejected, (state: any, action: any) => {
      state.status = 'failed';
      state.messageResponse = null;
      state.error = action.payload.errors || 'Error desconocido';
    });
};
