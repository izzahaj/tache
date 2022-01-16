import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TagsState {
  id: number,
  name: string
};

const initialStateValue: TagsState[] = [];

const tagsSlice = createSlice({
  name: "tags",
  initialState: { value: initialStateValue },
  reducers: {
    getTags: (state, action: PayloadAction<TagsState[]>) => {
      state.value = action.payload
    },
    removeTag: (state, action: PayloadAction<number>) => {
      const index = state.value.findIndex(tag => tag.id === action.payload)
      state.value.splice(index, 1)
    }
  }
});

export const { getTags, removeTag } = tagsSlice.actions;
export default tagsSlice.reducer;