import { postInfo } from './thunks';

export const handleFetchAbastecimiento = (builder: any) => {
  builder
    .addCase(postInfo.pending, (state: any) => {
      state.status = 'loading';
    })
    .addCase(postInfo.fulfilled, (state: any, action: any) => {
      state.status = 'succeeded';
      state.error = null;
      state.successMessage = action.payload.data;
    })
    .addCase(postInfo.rejected, (state: any, action: any) => {
      state.status = 'failed';
      state.successMessage = null;
      state.error = action.payload.errors || 'Error desconocido';
    });
};
