import { InitialStateOperaciones } from '@/types/operaciones';
import { TablaCargaThunk, GetTablaReportesDiarios, GetTablaVisualCarga } from './thunks';

export const handleFetchTablaCarga = (builder: any) => {
  builder
    .addCase(TablaCargaThunk.pending, (state: InitialStateOperaciones) => {
      state.status = 'loading';
    })
    .addCase(TablaCargaThunk.fulfilled, (state: InitialStateOperaciones, action: any) => {
      state.messageResponse = action.payload.data.message;
      state.responseTablaReportesDiarios = action.payload.data.result;
      state.status = 'succeeded';
      state.error = null;
    })
    .addCase(TablaCargaThunk.rejected, (state: InitialStateOperaciones, action: any) => {
      state.status = 'failed';
      state.messageResponse = null;
      state.error = action.payload.errors || 'Error desconocido';
    });
};

export const handleGetTablaReportesDiarios = (builder: any) => {
  builder
    .addCase(GetTablaReportesDiarios.pending, (state: InitialStateOperaciones) => {
      state.status = 'loading';
    })
    .addCase(GetTablaReportesDiarios.fulfilled, (state: InitialStateOperaciones, action: any) => {
      state.responseTablaReportesDiarios = action.payload.data;
      state.status = 'succeeded';
      state.error = null;
    })
    .addCase(GetTablaReportesDiarios.rejected, (state: InitialStateOperaciones, action: any) => {
      state.status = 'failed';
      state.messageResponse = null;
      state.error = action.payload.errors || 'Error desconocido';
    });
};

export const handleGetTablaVisualCarga = (builder: any) => {
  builder
    .addCase(GetTablaVisualCarga.pending, (state: InitialStateOperaciones) => {
      state.status = 'loading';
    })
    .addCase(GetTablaVisualCarga.fulfilled, (state: InitialStateOperaciones, action: any) => {
      state.responseTablaVisualCarga = action.payload.data;
      state.status = 'succeeded';
      state.error = null;
    })
    .addCase(GetTablaVisualCarga.rejected, (state: InitialStateOperaciones, action: any) => {
      state.status = 'failed';
      state.messageResponse = null;
      state.error = action.payload.errors || 'Error desconocido';
    });
};
