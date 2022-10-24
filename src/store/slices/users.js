import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: null,
  userFilters: {
    role: null,
  },
};

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(
        (user) => user._id === action.payload.id
      );
      state.users[index] = {
        ...state.users[index],
        username: action.payload.username,
        role: action.payload.role,
      };
    },
  },
});

export const { setUsers, updateUser } = userSlice.actions;

export default userSlice.reducer;
