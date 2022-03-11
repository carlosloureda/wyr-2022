import { configureStore } from "@reduxjs/toolkit";
import questionsReducer from "./questionsSlice";
import usersReducer from "./usersSlice";

export const store = configureStore({
  reducer: {
    questions: questionsReducer,
    users: usersReducer,
  },
});
