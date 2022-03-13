import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "@/api";
import { userAnsweredQuestion, userCreatedQuestion } from "./usersSlice";

const initialState = {
  questions: null,
  loading: false,
  action: "", // 'fetchQuestions', 'fetchQuestionById', 'addQuestion'
  error: {
    message: "",
  },
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
      state.action = "fetchQuestions";
    },
    getQuestionsSuccess: (state, { payload }) => {
      state.questions = {
        ...(state.questions || {}),
        ...payload,
      };
      state.loading = false;
      state.error = {
        message: "",
      };
      state.allFetched = true;
    },
    getQuestionsFailure: (state, { payload }) => {
      state.loading = false;
      state.error = {
        message: payload.error,
      };
      state.allFetched = false;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchQuestionById.pending, (state, action) => {
      state.loading = true;
      state.action = "fetchQuestionById";
    });
    builder.addCase(fetchQuestionById.fulfilled, (state, action) => {
      // Add user to the state array
      state.questions = {
        ...state.questions,
        [action.payload.id]: action.payload,
      };
      state.loading = false;
      state.error = {
        message: "",
      };
    });
    builder.addCase(fetchQuestionById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.error = {
        message: action.error.message,
      };
    });

    // Add Question
    builder.addCase(addQuestion.pending, (state, action) => {
      state.loading = true;
      state.action = "addQuestion";
    });
    builder.addCase(addQuestion.fulfilled, (state, action) => {
      state.questions = {
        ...state.questions,
        [action.payload.id]: action.payload,
      };
      state.loading = false;
      state.error = {
        message: "",
      };
    });
    builder.addCase(addQuestion.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.error = {
        message: action.error.message,
      };
    });

    // Answer Question
    builder.addCase(answerQuestion.pending, (state, action) => {
      state.loading = true;
      state.action = "answerQuestions";
    });
    builder.addCase(answerQuestion.fulfilled, (state, action) => {
      state.questions = {
        ...state.questions,
        [action.payload.id]: action.payload.questionUpdated,
      };
      state.loading = false;
      state.error = {
        message: "",
      };
    });
    builder.addCase(answerQuestion.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.error = {
        message: action.error.message,
      };
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
      const data = await new Promise((res, rej) =>
        setTimeout(async () => {
          const parsedQuestions = await Api.get(`/questions`);
          res(parsedQuestions);
        }, 2000)
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
      return Api.get(`/questions/:questionId`, { questionId });
    } else {
      return state.questions.questions[questionId];
    }
  }
);

export const addQuestion = createAsyncThunk(
  "questions/addQuestion",
  async ({ optionOne, optionTwo, author }, thunkAPI) => {
    const questionCreated = await Api.post(`/questions/add`, {
      optionOne,
      optionTwo,
      author,
    });
    thunkAPI.dispatch(
      userCreatedQuestion({
        questionId: questionCreated.id,
        id: author,
      })
    );
    return questionCreated;
  }
);

export const answerQuestion = createAsyncThunk(
  "questions/answerQuestion",
  async ({ id, answer, userId, question }, thunkAPI) => {
    const questionUpdated = await Api.post(`/questions/${id}/answer`, {
      id,
      answer,
      userId,
      question,
    });

    thunkAPI.dispatch(
      userAnsweredQuestion({
        questionId: questionUpdated.id,
        answer,
        id: userId,
      })
    );
    return {
      id,
      questionUpdated,
    };
  }
);
