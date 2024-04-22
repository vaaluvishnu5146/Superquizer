import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "tasks", // SLICE NAME
  initialState: {
    tasks: [],
    task: {},
  },
  reducers: {
    addTodo: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      if (action.payload) {
        state.tasks.push(action.payload);
      }
    },
    // updateTodo: (state, action) => {},
    deleteTodo: (state, action) => {
      let tasksCopy = [...state.tasks];
      tasksCopy = tasksCopy.filter((task) => task != action.payload);
      return { ...state, tasks: tasksCopy };
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTodo, deleteTodo } = taskSlice.actions;
export default taskSlice.reducer;
