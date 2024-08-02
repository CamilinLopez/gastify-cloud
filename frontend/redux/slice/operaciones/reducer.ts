import { InitialStateOperaciones } from '@/types/operaciones';
import { TablaCargaThunk } from './thunks';

export const handleFetchTablaCarga = (builder: any) => {
  builder
    .addCase(TablaCargaThunk.pending, (state: InitialStateOperaciones) => {
      state.status = 'loading';
    })
    .addCase(TablaCargaThunk.fulfilled, (state: InitialStateOperaciones, action: any) => {
      console.log(action);
      state.messageResponse = action.payload.data.message;
      state.status = 'succeeded';
      state.error = null;
    })
    .addCase(TablaCargaThunk.rejected, (state: InitialStateOperaciones, action: any) => {
      state.status = 'failed';
      state.messageResponse = null;
      state.error = action.payload.errors || 'Error desconocido';
    });
};
