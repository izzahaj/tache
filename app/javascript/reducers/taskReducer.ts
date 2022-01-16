import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TaskState {
  description: string,
  deadline: string,
  priority: string
}

const taskSlice = createSlice({
  name: "task",
  initialState: { value: { description: "", deadline: "", priority: "" } },
  reducers: {
    setTask: (state, action: PayloadAction<TaskState>) => {
      state.value = action.payload
    },
    updateTask: (state, action: PayloadAction<TaskState>) => {
      state.value = action.payload
    }
  }
});

export const { setTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;