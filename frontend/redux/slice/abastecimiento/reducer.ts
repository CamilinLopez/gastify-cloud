import { postInfo } from './thunks';

export const handleFetchAbastecimiento = (builder: any) => {
  builder
    .addCase(postInfo.pending, (state: any) => {
      state.status = 'loading';
    })
    .addCase(postInfo.fulfilled, (state: any, action: any) => {
      state.status = 'succeeded';
      state.list = action.payload;
    })
    .addCase(postInfo.rejected, (state: any, action: any) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
};
