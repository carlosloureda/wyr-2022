import { createSlice } from "@reduxjs/toolkit";
import questions from "../data/questions.json";

const initialState = {
  questions: null,
  loading: false,
  error: "",
};

// returns {actions, caseReducers, getInitialState, name, reducer }
export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    getOne: (state, action) => {
      console.log("state: ", state);
      console.log("action: ", action);
    },

    getQuestions: (state) => {
      state.loading = true;
    },
    getQuestionsSuccess: (state, { payload }) => {
      state.questions = payload;
      state.loading = false;
      state.error = "";
    },
    getQuestionsFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload.error;
    },
  },
});

console.log(questionsSlice.reducer);
// Action creators are generated for each case reducer function
export const { getQuestions, getQuestionsSuccess, getQuestionsFailure } =
  questionsSlice.actions;

export const questionsSelector = (state) => state.questions;
export default questionsSlice.reducer;

export function fetchQuestions() {
  return async (dispatch) => {
    dispatch(getQuestions());

    try {
      //   const response = await fetch("/api/questions");
      //   const data = await response.json();
      const data = await new Promise(
        (res, rej) => setTimeout(() => res(questions), 2000)
        // setTimeout(() => rej(`Network down`), 2000)
      );
      dispatch(getQuestionsSuccess(data));
    } catch (error) {
      dispatch(getQuestionsFailure({ error: error }));
    }
  };
}
