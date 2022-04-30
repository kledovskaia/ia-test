import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchMessages } from '../thunks/messages';

const initialState = {
  data: [] as Message[],
  loading: false,
  error: null as string | null,
  favorites: {} as {
    [key in Message['id']]: Message['isFavorite'];
  },
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setIsFavorite: (
      state,
      action: PayloadAction<{
        id: Message['id'];
        isFavorite: Message['isFavorite'];
      }>
    ) => {
      const { id, isFavorite } = action.payload;
      state.favorites[id] = isFavorite;

      state.data.forEach((item) => {
        if (item.id === id) {
          item.isFavorite = isFavorite;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.pending, (state) => {
      state.error = null;
      state.loading = true;
    });
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.error = null;
      state.loading = false;
      state.data.push(
        ...action.payload.map((item) => ({
          ...item,
          isFavorite: item.isFavorite ?? state.favorites[item.id],
        }))
      );
    });
    builder.addCase(fetchMessages.rejected, (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.error = action.error.message || 'Ooops... Something went wrong!';
    });
  },
});

export const { setIsFavorite } = messagesSlice.actions;
export default messagesSlice.reducer;
