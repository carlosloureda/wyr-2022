import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import questions from "../data/questions.json";
import { v4 as uuidv4 } from "uuid";
import users from "../data/users.json";

const initialState = {
  questions: null,
  loading: false,
  error: "",
  // To diff when we fetched all the info or not.
  allFetched: false,
};

// returns {actions, caseReducers, getInitialState, name, reducer }
export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    getQuestions: (state) => {
      state.loading = true;
    },
    getQuestionsSuccess: (state, { payload }) => {
      state.questions = {
        ...(state.questions || {}),
        ...payload,
      };
      state.loading = false;
      state.error = "";
      state.allFetched = true;
    },
    getQuestionsFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload.error;
      state.allFetched = false;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchQuestionById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchQuestionById.fulfilled, (state, action) => {
      // Add user to the state array
      state.questions = {
        ...state.questions,
        [action.payload.id]: action.payload,
      };
      state.loading = false;
      state.error = "";
    });
    builder.addCase(fetchQuestionById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Add Question
    builder.addCase(addQuestion.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addQuestion.fulfilled, (state, action) => {
      state.questions = {
        ...state.questions,
        [action.payload.id]: action.payload,
      };
      state.loading = false;
      state.error = "";
    });
    builder.addCase(addQuestion.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

// Action creators are generated for each case reducer function
export const { getQuestions, getQuestionsSuccess, getQuestionsFailure } =
  questionsSlice.actions;

export const questionsSelector = (state) => state.questions;
export const questionSelector = (state, questionId) => {
  return (
    (state.questions?.questions?.length &&
      state.questions.questions[questionId]) ||
    null
  );
};

export default questionsSlice.reducer;

export function fetchQuestions() {
  return async (dispatch) => {
    dispatch(getQuestions());

    try {
      //   const response = await fetch("/api/questions");
      //   const data = await response.json();
      const data = await new Promise(
        (res, rej) =>
          setTimeout(() => {
            const parsedQuestions = Object.values(questions).map((question) => {
              return {
                ...question,
                authorAvatarUrl: users[question.author].avatarURL,
              };
            });
            res(parsedQuestions);
          }, 2000)
        // setTimeout(() => rej(`Network down`), 2000)
      );
      dispatch(getQuestionsSuccess(data));
    } catch (error) {
      dispatch(getQuestionsFailure({ error: error }));
    }
  };
}

export const fetchQuestionById = createAsyncThunk(
  "questions/fetchQuestionById",
  async (questionId, thunkAPI) => {
    const state = thunkAPI.getState();
    if (!state.questions.questions || !state.questions?.questions[questionId]) {
      return await new Promise((res, rej) =>
        setTimeout(() => {
          if (questions[questionId]) {
            res(questions[questionId]);
          } else {
            rej(`Question ${questionId} not found`);
          }
        }, 2000)
      );
    } else {
      return state.questions.questions[questionId];
    }
  }
);

export const addQuestion = createAsyncThunk(
  "questions/addQuestion",
  async ({ optionOne, optionTwo, author }, thunkAPI) => {
    const questionId = await new Promise((res, rej) =>
      setTimeout(() => {
        res(uuidv4());
        // rej("hjasdiads");
      }, 2000)
    );
    return {
      id: questionId,
      author: author,
      timestamp: Date.now(),
      optionOne: {
        votes: [],
        text: optionOne,
      },
      optionTwo: {
        votes: [],
        text: optionTwo,
      },
    };
  }
);
