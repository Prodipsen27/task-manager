import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice"; // Ensure this exists

const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

export default store;
