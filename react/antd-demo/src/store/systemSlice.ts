import { createSlice } from '@reduxjs/toolkit';

export const systemSlice = createSlice({
	name: 'system',
	initialState: {
		theme: 'light'
	},
	reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    }
	}
});

export const { setTheme } = systemSlice.actions;

export default systemSlice.reducer;
