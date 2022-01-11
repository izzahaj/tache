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
    }
  }
});

export const { getTags } = tagsSlice.actions;
export default tagsSlice.reducer;