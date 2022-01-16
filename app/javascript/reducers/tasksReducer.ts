import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TaskState {
  id: number | string | undefined,
  description: string,
  deadline: string,
  priority: string
}

const initialStateValue: TaskState[] = [];

const tasksSlice = createSlice({
  name: "tasks",
  initialState: { value: initialStateValue },
  reducers: {
    setTasks: (state, action: PayloadAction<TaskState[]>) => {
      state.value = action.payload
    },
    removeTask: (state, action: PayloadAction<number | string | undefined>) => {
      const index = state.value.findIndex(task => task.id === action.payload)
      state.value.splice(index, 1)
    }
  }
});

export const { setTasks, removeTask } = tasksSlice.actions;
export default tasksSlice.reducer;
