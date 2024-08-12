import { RolesState } from '@/types/roles'; // Ajusta la ruta según tu tipo de datos
import { RolesThunk } from './thunks';

export const handleFetchRegistroLogin = (builder: any) => {
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
    })


};
