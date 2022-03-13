import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import users from "../data/users.json";

const initialState = {
  users: null,
  loading: false,
  error: "",
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userCreatedQuestion: (state, { payload }) => {
      //TODO: if no users we should fetch from API
      const _users = state.users || users;
      state.users = {
        ..._users,
        [payload.id]: {
          ..._users[payload.id],
          questions: [
            ...(_users[payload.id].questions || []),
            payload.questionId,
          ],
        },
      };
    },
    userAnsweredQuestion: (state, { payload }) => {
      //TODO: if no users we should fetch from API
      const _users = state.users || users;
      state.users = {
        ..._users,
        [payload.id]: {
          ..._users[payload.id],
          answers: {
            ...(_users[payload.id].answers || {}),
            [payload.questionId]: payload.answer,
          },
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { userCreatedQuestion, userAnsweredQuestion } = usersSlice.actions;
export default usersSlice.reducer;

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  // const response = await fetch("/api/users");
  // const data = await response.json();
  const data = await new Promise((res, rej) =>
    setTimeout(() => res(users), 2000)
  );
  return data;
});
