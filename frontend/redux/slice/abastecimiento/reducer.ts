import { initialStateAbastecimiento, initialStateFormAbastecimiento } from '@/types/abastecimieneto';
import { crearFormulario, getTablaStock } from './thunks';

export const handleFetchAbastecimiento = (builder: any) => {
  builder
    .addCase(crearFormulario.pending, (state: any) => {
      state.status = 'loading';
    })
    .addCase(crearFormulario.fulfilled, (state: initialStateAbastecimiento, action: any) => {
      state.dataResponse = action.payload.data.nuevoRegistro;
      state.messageResponse = action.payload.data.message;
      state.tablaResponse = action.payload.data.getInfo;
      state.status = 'succeeded';
      state.error = null;
    })
    .addCase(crearFormulario.rejected, (state: initialStateAbastecimiento, action: any) => {
      state.status = 'failed';
      state.messageResponse = null;
      state.error = action.payload.errors || 'Error desconocido';
    });
};

export const handleGetTablaStock = (builder: any) => {
  builder
    .addCase(getTablaStock.pending, (state: any) => {
      state.status = 'loading';
    })
    .addCase(getTablaStock.fulfilled, (state: initialStateAbastecimiento, action: any) => {
      state.tablaResponse = action.payload.data.getInfo;
      state.status = 'succeeded';
      state.error = null;
    })
    .addCase(getTablaStock.rejected, (state: any, action: any) => {
      state.status = 'failed';
      state.successMessage = null;
      state.error = action.payload.errors || 'Error desconocido';
    });
};

