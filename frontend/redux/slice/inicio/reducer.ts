import { initialStateInicio } from '@/types/inicio';
import { getTablaInventarioResumen, getVentasPorDia, getVentasPorMes } from './thunks';

export const handleGetTablaResumenInventario = (builder: any) => {
  builder
    .addCase(getTablaInventarioResumen.pending, (state: any) => {
      state.status = 'loading';
    })
    .addCase(getTablaInventarioResumen.fulfilled, (state: initialStateInicio, action: any) => {
      state.responseTablaResumenInventario = action.payload.data;
      state.status = 'succeeded';
      state.error = null;
    })
    .addCase(getTablaInventarioResumen.rejected, (state: any, action: any) => {
      state.status = 'failed';
      state.successMessage = null;
      state.error = action.payload.errors || 'Error desconocido';
    });
};

export const handleGetVentaPorDia = (builder: any) => {
  builder
    .addCase(getVentasPorDia.pending, (state: any) => {
      state.status = 'loading';
    })
    .addCase(getVentasPorDia.fulfilled, (state: initialStateInicio, action: any) => {
      state.responseVentaPorDia = action.payload.data;
      state.status = 'succeeded';
      state.error = null;
    })
    .addCase(getVentasPorDia.rejected, (state: any, action: any) => {
      state.status = 'failed';
      state.successMessage = null;
      state.error = action.payload.errors || 'Error desconocido';
    });
};

export const handleGetVentaPorMes = (builder: any) => {
  builder
    .addCase(getVentasPorMes.pending, (state: any) => {
      state.status = 'loading';
    })
    .addCase(getVentasPorMes.fulfilled, (state: initialStateInicio, action: any) => {
      state.responseVentaPorMes = action.payload.data;
      state.status = 'succeeded';
      state.error = null;
    })
    .addCase(getVentasPorMes.rejected, (state: any, action: any) => {
      state.status = 'failed';
      state.successMessage = null;
      state.error = action.payload.errors || 'Error desconocido';
    });
};
