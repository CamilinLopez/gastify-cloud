import { initialStateInventario } from '@/types/inventario_bodegas';
import { getTablaBodega } from './thunks';

export const handleGetTablaBodega = (builder: any) => {
  builder
    .addCase(getTablaBodega.pending, (state: any) => {
      state.status = 'loading';
    })
    .addCase(getTablaBodega.fulfilled, (state: initialStateInventario, action: any) => {
      state.tablaBodega = action.payload.data.result;
      state.status = 'succeeded';
      state.error = null;
      state.messageResponse = action.payload.data.message;
    })
    .addCase(getTablaBodega.rejected, (state: any, action: any) => {
      state.status = 'failed';
      state.successMessage = null;
      state.error = action.payload.errors || 'Error desconocido';
    });
};
