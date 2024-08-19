import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { rolesReducer } from './reducer';
import { RolesState } from '@/types/roles';

const initialState: RolesState = {
  roles: [],
  status: 'idle',
  error: null,
  messageResponse: '',
};

const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    rolesReducer(builder);
  },
});
export const {} = rolesSlice.actions;
export default rolesSlice.reducer;
