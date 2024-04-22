import { configureStore } from "@reduxjs/toolkit";
import TaskReducer from "./Reducers/tasks.reducer";

// ROOT OR COMBINED REDUCER
export default configureStore({
  reducer: {
    tasks: TaskReducer,
  },
});
