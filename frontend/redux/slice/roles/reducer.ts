import { RolesState, PermisosState } from '@/types/roles'; // Ajusta la ruta según tu tipo de datos
import { RolesThunk, PermisosThunk } from './thunks';

// Reducer para roles
export const rolesReducer = (builder: any) => {
  builder
    .addCase(RolesThunk.pending, (state: RolesState) => {
      state.status = 'loading';
    })
    .addCase(RolesThunk.fulfilled, (state: RolesState, action: any) => {
      state.roles = action.payload.data;
      state.messageResponse = action.payload.message;
      state.status = 'succeeded';
      state.error = null;
    })
    .addCase(RolesThunk.rejected, (state: RolesState, action: any) => {
      state.status = 'failed';
      state.messageResponse = null;
      state.error = action.payload.message || 'Error desconocido';
    });
};

// Reducer para permisos
export const permisosReducer = (builder: any) => {
  builder
    .addCase(PermisosThunk.pending, (state: PermisosState) => {
      state.status = 'loading';
    })
    .addCase(PermisosThunk.fulfilled, (state: PermisosState, action: any) => {
      state.permisos = action.payload.data.map((permiso: any) => ({
        id: permiso.id,
        nombre: permiso.nombre,
      }));
      state.messageResponse = action.payload.message;
      state.status = 'succeeded';
      state.error = null;
    })
    .addCase(PermisosThunk.rejected, (state: PermisosState, action: any) => {
      state.status = 'failed';
      state.messageResponse = null;
      state.error = action.payload.message || 'Error desconocido';
    });
};
