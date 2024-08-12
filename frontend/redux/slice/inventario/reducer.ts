import { initialStateInventario } from '@/types/inventario_bodegas';
import {
  getTablaBodega,
  crearConductor,
  getTablaConductores,
  crearCamion,
  tablaCamion,
  borrarCamiones,
  borrarConductores,
} from './thunks';

export const handleGetTablaBodega = (builder: any) => {
  builder
    .addCase(getTablaBodega.pending, (state: any) => {
      state.status = 'loading';
    })
    .addCase(getTablaBodega.fulfilled, (state: initialStateInventario, action: any) => {
      state.tablaBodegaFiteredByDate = action.payload.data.result;
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

export const handleCrearConductor = (builder: any) => {
  builder
    .addCase(crearConductor.pending, (state: initialStateInventario) => {
      state.status = 'loading';
    })
    .addCase(crearConductor.fulfilled, (state: initialStateInventario, action: any) => {
      state.sectionConductores.message = action.payload.data.message;
      state.sectionConductores.tabla = action.payload.data.result;
      state.status = 'succeeded';
      state.error = null;
    })
    .addCase(crearConductor.rejected, (state: initialStateInventario, action: any) => {
      state.messageResponse = null;
      state.status = 'failed';
      state.error = action.payload.errors || 'Error desconocido';
    });
};

export const handleTablaConducter = (builder: any) => {
  builder
    .addCase(getTablaConductores.pending, (state: initialStateInventario) => {
      state.status = 'loading';
    })
    .addCase(getTablaConductores.fulfilled, (state: initialStateInventario, action: any) => {
      state.sectionConductores.message = action.payload.data.message;
      state.sectionConductores.tabla = action.payload.data.result;
      state.status = 'succeeded';
      state.error = null;
    })
    .addCase(getTablaConductores.rejected, (state: initialStateInventario, action: any) => {
      state.messageResponse = null;
      state.status = 'failed';
      state.error = action.payload.errors || 'Error desconocido';
    });
};

export const handleCrearCamion = (builder: any) => {
  builder
    .addCase(crearCamion.pending, (state: initialStateInventario) => {
      state.status = 'loading';
    })
    .addCase(crearCamion.fulfilled, (state: initialStateInventario, action: any) => {
      state.sectionCamiones.message = action.payload.data.message;
      state.sectionCamiones.tabla = action.payload.data.result;
      state.status = 'succeeded';
      state.error = null;
    })
    .addCase(crearCamion.rejected, (state: initialStateInventario, action: any) => {
      state.status = 'failed';
      state.error = action.payload.errors || 'Error desconocido';
    });
};

export const handleGetTablaCamion = (builder: any) => {
  builder
    .addCase(tablaCamion.pending, (state: initialStateInventario) => {
      state.status = 'loading';
    })
    .addCase(tablaCamion.fulfilled, (state: initialStateInventario, action: any) => {
      state.sectionCamiones.message = action.payload.data.message;
      state.sectionCamiones.tabla = action.payload.data.result;
      state.status = 'succeeded';
      state.error = null;
    })
    .addCase(tablaCamion.rejected, (state: initialStateInventario, action: any) => {
      state.status = 'failed';
      state.error = action.payload.errors || 'Error desconocido';
    });
};

export const handleDeleteCamion = (builder: any) => {
  builder
    .addCase(borrarCamiones.pending, (state: initialStateInventario) => {
      state.status = 'loading';
    })
    .addCase(borrarCamiones.fulfilled, (state: initialStateInventario, action: any) => {
      state.sectionCamiones.message = action.payload.data.message;
      state.sectionCamiones.tabla = action.payload.data.result;
      state.status = 'succeeded';
      state.error = null;
    })
    .addCase(borrarCamiones.rejected, (state: initialStateInventario, action: any) => {
      state.status = 'failed';
      state.error = action.payload.errors || 'Error desconocido';
    });
};

export const handleDeleteConductores = (builder: any) => {
  builder
    .addCase(borrarConductores.pending, (state: initialStateInventario) => {
      state.status = 'loading';
    })
    .addCase(borrarConductores.fulfilled, (state: initialStateInventario, action: any) => {
      state.sectionConductores.message = action.payload.data.message;
      state.sectionConductores.tabla = action.payload.data.result;
      state.status = 'succeeded';
      state.error = null;
    })
    .addCase(borrarConductores.rejected, (state: initialStateInventario, action: any) => {
      state.status = 'failed';
      state.error = action.payload.errors || 'Error desconocido';
    });
};
