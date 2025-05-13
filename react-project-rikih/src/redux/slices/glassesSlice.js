import { createSlice } from '@reduxjs/toolkit';

const glassesSlice = createSlice({
  name: 'glasses',
  initialState: {
    selectedGlasses: null, // תמונת המשקפיים שנבחרה
  },
  reducers: {
    setSelectedGlasses(state, action) {
      state.selectedGlasses = action.payload;
    },
  },
});

export const { setSelectedGlasses } = glassesSlice.actions;
export default glassesSlice.reducer;