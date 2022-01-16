import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialTagListState: string[] = [];

const tagListSlice = createSlice({
  name: "tagList",
  initialState: { value: initialTagListState },
  reducers: {
    setTagList: (state, action: PayloadAction<string[]>) => {
      state.value = action.payload
    },
    updateTagList: (state, action: PayloadAction<string[]>) => {
      state.value = action.payload
    }
  }
});

export const { setTagList, updateTagList } = tagListSlice.actions;
export default tagListSlice.reducer;