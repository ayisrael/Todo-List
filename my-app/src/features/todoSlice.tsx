import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Task {
  name: string;
  id: number;
  iscompleted: boolean;
}

const initialState = {
  todoList: [] as Task[],
};

const todoSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    setTodoList: (state, action: PayloadAction<Task[]>) => {
      state.todoList = action.payload;
      console.log(state.todoList);
    },
    addTask: (state, action) => {
      state.todoList.push(action.payload);
      console.log(state.todoList);
    },

    deleteTask: (state, action) => {
      state.todoList = state.todoList.filter(
        (item) => item.id !== action.payload
      );
    },
    toggleTask: (state, action) => {
      const taskId = action.payload;
      const taskIndex = state.todoList.findIndex((task) => task.id === taskId);
      const task = state.todoList[taskIndex];
      task.iscompleted = !task.iscompleted;
    },
  },
});

export const { actions } = todoSlice;
export default todoSlice.reducer;
