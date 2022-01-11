import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TasksState {
  id: number,
  description: string,
  deadline: string,
  priority: string
}

const initialStateValue: TasksState[] = [];

const tasksSlice = createSlice({
  name: "tasks",
  initialState: { value: initialStateValue },
  reducers: {
    getTasks: (state, action: PayloadAction<TasksState[]>) => {
      state.value = action.payload
    }
  }
});

export const { getTasks } = tasksSlice.actions;
export default tasksSlice.reducer;

