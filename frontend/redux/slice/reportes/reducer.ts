import { InitialStateReportes } from '@/types/reportes';
import { GetTablaReportes } from './thunks';

export const handleFetchTablaReportes = (builder: any) => {
  builder
    .addCase(GetTablaReportes.pending, (state: InitialStateReportes) => {
      state.status = 'loading';
    })
    .addCase(GetTablaReportes.fulfilled, (state: InitialStateReportes, action: any) => {
      state.responseTablaReportes = action.payload.data;
      state.status = 'succeeded';
      state.error = null;
    })
    .addCase(GetTablaReportes.rejected, (state: InitialStateReportes, action: any) => {
      state.status = 'failed';
      state.error = action.payload.errors || 'Error desconocido';
    });
};
