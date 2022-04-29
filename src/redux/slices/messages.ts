import { createSlice } from '@reduxjs/toolkit';
import { fetchMessages } from '../thunks/messages';

const initialState = {
  data: [] as Message[],
  loading: false,
  error: null as string | null,
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.pending, (state) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      state.data.push(...action.payload);
    });
    builder.addCase(fetchMessages.rejected, (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.error = action.error.message || 'Ooops... Something went wrong!';
    });
  },
});

export const {} = messagesSlice.actions;
export default messagesSlice.reducer;
